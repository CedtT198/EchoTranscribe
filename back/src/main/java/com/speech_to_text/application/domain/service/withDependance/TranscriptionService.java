package com.speech_to_text.application.domain.service.withDependance;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.WebSocketSession;
import com.github.kokorin.jaffree.ffmpeg.FFmpeg;
import com.github.kokorin.jaffree.ffmpeg.UrlInput;
import com.github.kokorin.jaffree.ffmpeg.UrlOutput;
import com.google.api.gax.longrunning.OperationFuture;
import com.google.api.gax.rpc.ClientStream;
import com.google.api.gax.rpc.ResponseObserver;
import com.google.api.gax.rpc.StreamController;
import com.google.cloud.speech.v2.*;
import com.google.cloud.speech.v2.SpeechAdaptation.AdaptationPhraseSet;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.model.DTO.PerformanceStatDTO;
import com.speech_to_text.application.domain.model.DTO.TranscriptionFilterDto;
import com.speech_to_text.application.domain.model.DTO.TranscriptionSettings;
import com.speech_to_text.application.domain.model.config.GoogleCloud;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import com.speech_to_text.application.domain.port.out.TranscriptionRepository;
import com.speech_to_text.application.domain.port.out.TranscriptionSettingsRepository;
import com.speech_to_text.application.domain.service.independant.TaskStatus;
import com.speech_to_text.application.infrastructure.adapters.web.AudioWebSocketHandler;

import lombok.AllArgsConstructor;

@Service
@EnableAsync
@AllArgsConstructor
public class TranscriptionService implements TranscriptionUseCase {

    private final GoogleCloud gcloud;
    private final MediaFileUseCase mediaFileUseCase;
    private final TranscriptionSettingsRepository repo;
    private final TranscriptionRepository transcriptionRepo;

    
    @Override
    public double getTotalHoursTranscribed(LocalDate startDate, LocalDate endDate) {
        return transcriptionRepo.getTotalHoursTranscribed(startDate, endDate);
    }

    @Override
    public Page<Transcription> findByFilters(TranscriptionFilterDto dto, Pageable pageable) {
        return transcriptionRepo.findByFilters(dto.getAuth0Id(), dto.getStartDate(), dto.getEndDate(), dto.getContentPhrase(), dto.getSummaryPhrase(), dto.getTranscriptionType(), pageable);
    }
    
    @Override
    public PerformanceStatDTO getPerfDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception {
        return transcriptionRepo.getPerfDashboardStat(startDate, endDate);
    }


    
    @Override
    public void initStreamingConfig(WebSocketSession session, TranscriptionSettings settings) throws Exception {
        String recognizer = gcloud.getGlobalRecognizer();

        SpeechClient speechClient = SpeechClient.create(SpeechSettings.newBuilder()
            .setEndpoint(gcloud.getEndpoint())
            .build()
        );

        ResponseObserver<StreamingRecognizeResponse> responseObserver = new ResponseObserver<>() {
            @Override
            public void onStart(StreamController controller) {}

            @Override
            public void onResponse(StreamingRecognizeResponse response) {
                for (StreamingRecognitionResult result : response.getResultsList()) {
                    String transcript = result.getAlternativesList().get(0).getTranscript();
                    boolean isFinal = result.getIsFinal();
                    AudioWebSocketHandler.sendTranscript(session, transcript, isFinal);
                    // try {
                    //     session.sendMessage(new org.springframework.web.socket.TextMessage("{\"transcript\": \"" + transcript + "\", \"isFinal\": " + isFinal + "}"));
                    // } catch (IOException e) {
                    //     e.printStackTrace();
                    // }
                }
            }

            @Override
            public void onError(Throwable t) {
                System.err.println("Error streaming : " + t.getMessage());
                try {
                    session.close();
                } catch (IOException ignored) {}
            }

            @Override
            public void onComplete() {
                System.out.println("Streaming finished");
            }
        };

        ClientStream<StreamingRecognizeRequest> clientStream = speechClient.streamingRecognizeCallable().splitCall(responseObserver);
        
        RecognitionConfig config = buildConfigSTR(settings);
        StreamingRecognitionFeatures streamingFeatures = StreamingRecognitionFeatures.newBuilder()
            .setInterimResults(settings.withInterimResults)

            // Voice Activity Detection + timeouts automatiques
            .setEnableVoiceActivityEvents(true) // Active les événements VAD (nécessaire pour les timeouts)
            .setVoiceActivityTimeout(StreamingRecognitionFeatures.VoiceActivityTimeout.newBuilder()
                .setSpeechStartTimeout(com.google.protobuf.Duration.newBuilder()
                    .setSeconds(10)
                    .build())
                .setSpeechEndTimeout(com.google.protobuf.Duration.newBuilder()
                    .setSeconds(30) 
                    .build())
                .build())
            .build();

        StreamingRecognitionConfig streamingConfig = StreamingRecognitionConfig.newBuilder()
            .setConfig(config)
            .setStreamingFeatures(streamingFeatures)
            .build();

        StreamingRecognizeRequest initialRequest = StreamingRecognizeRequest.newBuilder()
            .setRecognizer(recognizer)
            .setStreamingConfig(streamingConfig)
            .build();

        clientStream.send(initialRequest);

        session.getAttributes().put("clientStream", clientStream);
        session.getAttributes().put("speechClient", speechClient);
    }
    

    
    @Override
    public TranscriptionSettings findSettings(String auth0Id, String type) {
        return repo.findByAuth0IdAndType(auth0Id, type);
    }



    @Override
    public String transcribeLongFile(MultipartFile file, TranscriptionSettings settings) throws Exception {
        // convert the file into an FLAC for better compatibility with Google stt
        ByteString convertedFile = mediaFileUseCase.convertAudiotoFLAC(file);

        // uploading the file to Google Storage 
        String audioUri = mediaFileUseCase.uploadToGCS(gcloud.getBucketName(), file.getOriginalFilename(), convertedFile); 
        System.out.println("Link: "+audioUri);

        // String fileName = "audio_" + System.currentTimeMillis() + ".flac";
        // System.out.println(gcloud.getBucketName());
        // String audioUri = mediaFileUseCase.convertAndUpload(file, gcloud.getBucketName(), file.getOriginalFilename()); 
        String recognizer = gcloud.getGlobalRecognizer();

        try (SpeechClient speechClient = SpeechClient.create(
            SpeechSettings.newBuilder()
                .setEndpoint(gcloud.getEndpoint())
                .build()
        )) {
            RecognitionConfig config = buildConfig(settings);

            BatchRecognizeFileMetadata metadata = BatchRecognizeFileMetadata.newBuilder()
                .setUri(audioUri)
                .build();

            RecognitionOutputConfig outputConfig = RecognitionOutputConfig.newBuilder()
                .setInlineResponseConfig(InlineOutputConfig.newBuilder().build())
                .build();

            BatchRecognizeRequest request = BatchRecognizeRequest.newBuilder()
                .setRecognizer(recognizer)
                .setConfig(config)
                .addFiles(metadata) // up to 15 files
                .setRecognitionOutputConfig(outputConfig)
                .build();

            System.out.println("Beginning transcription...");
            OperationFuture<BatchRecognizeResponse, OperationMetadata> future = speechClient.batchRecognizeAsync(request);
            BatchRecognizeResponse response;

            while (true) {
                if (future.isDone()) {
                    response = future.get();
                    break;
                }
                System.out.println("Still working... wait 30sec");
                Thread.sleep(30000);
            }

            BatchRecognizeFileResult fileResult = response.getResultsMap().get(audioUri);
            if (fileResult == null) {
                throw new RuntimeException("No result found for the URI : " + audioUri);
            }

            InlineResult inlineResult = fileResult.getInlineResult();
            if (inlineResult == null) {
                throw new RuntimeException("Missing inline results (maybe more than one file or a Google Cloud Storage issue ?)");
            }

            BatchRecognizeResults batchResults = inlineResult.getTranscript();
            List<SpeechRecognitionResult> results = batchResults.getResultsList();
            
            // deleteFromGCS(bucketName, fileName);

            return formatTranscript(results, settings);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    
    @Async
    @Override
    public void transcribeLongFileAsync(Path tempInputFile, String originalFilename, TranscriptionSettings settings, String taskId) throws Exception {
        // convert the file into an FLAC for better compatibility with Google stt
        TaskStatus.setProgress(taskId, 0);
        TaskStatus.setStatus(taskId, "Converting file...");

        Path tempFlacFile = Files.createTempFile("transcribe_", ".flac");

        try {
            FFmpeg.atPath()
                .addInput(UrlInput.fromPath(tempInputFile))
                .addArgument("-vn")
                .addArguments("-ac", "1")
                .addArguments("-ar", "16000")
                .addArguments("-c:a", "flac")
                .addArguments("-compression_level", "5")
                .addOutput(UrlOutput.toPath(tempFlacFile))
                .setOverwriteOutput(true)
                .execute();

            if (Files.size(tempFlacFile) == 0) {
                throw new IOException("Generated FLAC file empty.");
            }

            byte[] flacBytes = Files.readAllBytes(tempFlacFile);
            ByteString convertedFile = ByteString.copyFrom(flacBytes);

            // uploading the file to Google Storage 
            TaskStatus.setProgress(taskId, 10);
            TaskStatus.setStatus(taskId, "Processing...");
            String audioUri = mediaFileUseCase.uploadToGCS(gcloud.getBucketName(), originalFilename, convertedFile); 
            System.out.println("Link: "+audioUri);

            String recognizer = gcloud.getGlobalRecognizer();

            try (SpeechClient speechClient = SpeechClient.create(
                SpeechSettings.newBuilder()
                    .setEndpoint(gcloud.getEndpoint())
                    .build()
            )) {
                RecognitionConfig config = buildConfig(settings);

                BatchRecognizeFileMetadata metadata = BatchRecognizeFileMetadata.newBuilder()
                    .setUri(audioUri)
                    .build();

                RecognitionOutputConfig outputConfig = RecognitionOutputConfig.newBuilder()
                    .setInlineResponseConfig(InlineOutputConfig.newBuilder().build())
                    .build();

                BatchRecognizeRequest request = BatchRecognizeRequest.newBuilder()
                    .setRecognizer(recognizer)
                    .setConfig(config)
                    .addFiles(metadata) // up to 15 files
                    .setRecognitionOutputConfig(outputConfig)
                    .build();

                TaskStatus.setProgress(taskId, 30);
                TaskStatus.setStatus(taskId, "Transcription...");
                System.out.println("Beginning transcription...");
                OperationFuture<BatchRecognizeResponse, OperationMetadata> future = speechClient.batchRecognizeAsync(request);

                while (!future.isDone()) {
                    Thread.sleep(1000);
                    int progress = TaskStatus.getProgress(taskId);
                    TaskStatus.setProgress(taskId, Math.min(progress + 3, 90));
                }

                BatchRecognizeResponse response = future.get();
                    
                BatchRecognizeFileResult fileResult = response.getResultsMap().get(audioUri);
                if (fileResult == null) {
                    throw new RuntimeException("No result found for the URI : " + audioUri);
                }

                InlineResult inlineResult = fileResult.getInlineResult();
                if (inlineResult == null) {
                    throw new RuntimeException("Missing inline results (maybe more than one file or a Google Cloud Storage issue ?)");
                }

                BatchRecognizeResults batchResults = inlineResult.getTranscript();
                List<SpeechRecognitionResult> results = batchResults.getResultsList();
                
                String transcript = formatTranscript(results, settings);

                TaskStatus.setResult(taskId, transcript);
                TaskStatus.setProgress(taskId, 100);
                TaskStatus.setStatus(taskId, "COMPLETED");
            } catch (Exception e) {
                TaskStatus.setError(taskId, e.getMessage());
            }
        } finally {
            Files.deleteIfExists(tempInputFile);
            Files.deleteIfExists(tempFlacFile);
        }
    }


    // ty tsy miasa alo
    @Async
    @Override
    public void transcribeLongFileAsync(MultipartFile file, TranscriptionSettings settings, String taskId) throws Exception {
        // convert the file into an FLAC for better compatibility with Google stt
        TaskStatus.setProgress(taskId, 0);
        TaskStatus.setStatus(taskId, "Converting file...");
        ByteString convertedFile = mediaFileUseCase.convertAudiotoFLAC(file);

        // uploading the file to Google Storage 
        TaskStatus.setProgress(taskId, 10);
        TaskStatus.setStatus(taskId, "Processing...");
        String audioUri = mediaFileUseCase.uploadToGCS(gcloud.getBucketName(), file.getOriginalFilename(), convertedFile); 
        System.out.println("Link: "+audioUri);

        TaskStatus.setProgress(taskId, 15);
        String recognizer = gcloud.getGlobalRecognizer();

        TaskStatus.setProgress(taskId, 20);
        try (SpeechClient speechClient = SpeechClient.create(
            SpeechSettings.newBuilder()
                .setEndpoint(gcloud.getEndpoint())
                .build()
        )) {
            RecognitionConfig config = buildConfig(settings);

            BatchRecognizeFileMetadata metadata = BatchRecognizeFileMetadata.newBuilder()
                .setUri(audioUri)
                .build();

            RecognitionOutputConfig outputConfig = RecognitionOutputConfig.newBuilder()
                .setInlineResponseConfig(InlineOutputConfig.newBuilder().build())
                .build();

            BatchRecognizeRequest request = BatchRecognizeRequest.newBuilder()
                .setRecognizer(recognizer)
                .setConfig(config)
                .addFiles(metadata) // up to 15 files
                .setRecognitionOutputConfig(outputConfig)
                .build();

            TaskStatus.setProgress(taskId, 30);
            TaskStatus.setStatus(taskId, "Transcription...");
            System.out.println("Beginning transcription...");
            OperationFuture<BatchRecognizeResponse, OperationMetadata> future = speechClient.batchRecognizeAsync(request);

            while (!future.isDone()) {
                Thread.sleep(1000);
                int progress = TaskStatus.getProgress(taskId);
                TaskStatus.setProgress(taskId, Math.min(progress + 3, 90));
            }

            BatchRecognizeResponse response = future.get();
                
            BatchRecognizeFileResult fileResult = response.getResultsMap().get(audioUri);
            if (fileResult == null) {
                throw new RuntimeException("No result found for the URI : " + audioUri);
            }

            InlineResult inlineResult = fileResult.getInlineResult();
            if (inlineResult == null) {
                throw new RuntimeException("Missing inline results (maybe more than one file or a Google Cloud Storage issue ?)");
            }

            BatchRecognizeResults batchResults = inlineResult.getTranscript();
            List<SpeechRecognitionResult> results = batchResults.getResultsList();
            
            String transcript = formatTranscript(results, settings);

            TaskStatus.setResult(taskId, transcript);
            TaskStatus.setStatus(taskId, "COMPLETED");
            TaskStatus.setProgress(taskId, 100);
        } catch (Exception e) {
            TaskStatus.setError(taskId, e.getMessage());
        }
    }



    @Override
    public String transcribeShortFile(MultipartFile file, TranscriptionSettings settings) throws Exception {
        ByteString convertedFile = mediaFileUseCase.convertAudiotoFLAC(file);
        System.out.println("Conversion/Extraction audio from video done.");
        
        String recognizer = gcloud.getGlobalRecognizer();

        try (SpeechClient speechClient = SpeechClient.create(
            SpeechSettings.newBuilder()
                .setEndpoint(gcloud.getEndpoint())
                .build()
        )) {
            RecognitionConfig config = buildConfig(settings);

            RecognizeRequest request = RecognizeRequest.newBuilder()
                .setRecognizer(recognizer)
                .setConfig(config)
                .setContent(convertedFile)
                .build();

            RecognizeResponse response = speechClient.recognize(request);
            List<SpeechRecognitionResult> results = response.getResultsList();

            for (SpeechRecognitionResult result : results) {
                if (result.getAlternativesCount() > 0) {
                    SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                    System.out.println(alternative.getTranscript());
                }
            }
            return formatTranscript(results, settings);
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }



    private RecognitionConfig buildConfig(TranscriptionSettings settings) {
        RecognitionFeatures.Builder features = RecognitionFeatures.newBuilder();
        
        RecognitionConfig.Builder config = RecognitionConfig.newBuilder()
            .setAutoDecodingConfig(AutoDetectDecodingConfig.newBuilder().build())
            .addLanguageCodes(settings.mainLanguage)
            .setModel(gcloud.getModelSpeechToText());

            features.setEnableAutomaticPunctuation(true)
                                .setMaxAlternatives(1)
                                .setProfanityFilter(settings.filterProfanity);
                                // .setEnableWordTimeOffsets(settings.withWordTimeOffsets) // Better for sub-title
                                // .setEnableWordConfidence(settings.withWordConfidence) // not really necessary for user
        
        if (settings.useAlternativeLanguages && settings.alternativeLanguages != null && !settings.alternativeLanguages.isEmpty()) {
            config.addAllLanguageCodes(settings.alternativeLanguages);
        }
        
        if (settings.withDiarization && !settings.type.equals("streaming")) {
            features.setDiarizationConfig(SpeakerDiarizationConfig.newBuilder()
                .setMinSpeakerCount(settings.minPeople)
                .setMaxSpeakerCount(settings.maxPeople)
                .build());
        }

        if (settings.useSpeechContexts) {
            List<PhraseSet.Phrase> phraseObjects = settings.speechContextsPhrases.stream()
                .map(phrase -> PhraseSet.Phrase.newBuilder()
                    .setValue(phrase)
                    .setBoost(settings.boostSpeechContexts) 
                    .build())
                .collect(Collectors.toList());

            PhraseSet phraseSet = PhraseSet.newBuilder()
                .addAllPhrases(phraseObjects)
                .build();

            AdaptationPhraseSet adaptationPhraseSet = AdaptationPhraseSet.newBuilder()
                .setInlinePhraseSet(phraseSet)
                .build();

            config.setAdaptation(SpeechAdaptation.newBuilder()
                .addAllPhraseSets(List.of(adaptationPhraseSet))
                .build());
        }

        config.setFeatures(features.build());
        return config.build();
    }

    

    private RecognitionConfig buildConfigSTR(TranscriptionSettings settings) {
        RecognitionFeatures.Builder features = RecognitionFeatures.newBuilder();
        
        RecognitionConfig.Builder config = RecognitionConfig.newBuilder()
            .setExplicitDecodingConfig(
                ExplicitDecodingConfig.newBuilder()
                .setEncoding(ExplicitDecodingConfig.AudioEncoding.LINEAR16)
                .setSampleRateHertz(16000)
                .setAudioChannelCount(1)
                .build()
            )
            .addLanguageCodes(settings.mainLanguage)
            .setModel(gcloud.getModelSpeechToText());

            features.setEnableAutomaticPunctuation(true)
                                .setMaxAlternatives(1)
                                .setProfanityFilter(settings.filterProfanity);
        
        if (settings.useAlternativeLanguages && settings.alternativeLanguages != null && !settings.alternativeLanguages.isEmpty()) {
            config.addAllLanguageCodes(settings.alternativeLanguages);
        }
        
        if (settings.withDiarization && !settings.type.equals("streaming")) {
            features.setDiarizationConfig(SpeakerDiarizationConfig.newBuilder()
                .setMinSpeakerCount(settings.minPeople)
                .setMaxSpeakerCount(settings.maxPeople)
                .build());
        }

        if (settings.useSpeechContexts) {
            List<PhraseSet.Phrase> phraseObjects = settings.speechContextsPhrases.stream()
                .map(phrase -> PhraseSet.Phrase.newBuilder()
                    .setValue(phrase)
                    .setBoost(settings.boostSpeechContexts) 
                    .build())
                .collect(Collectors.toList());

            PhraseSet phraseSet = PhraseSet.newBuilder()
                .addAllPhrases(phraseObjects)
                .build();

            AdaptationPhraseSet adaptationPhraseSet = AdaptationPhraseSet.newBuilder()
                .setInlinePhraseSet(phraseSet)
                .build();

            config.setAdaptation(SpeechAdaptation.newBuilder()
                .addAllPhraseSets(List.of(adaptationPhraseSet))
                .build());
        }

        config.setFeatures(features.build());
        return config.build();
    }




    private String formatTranscript(List<SpeechRecognitionResult> results, TranscriptionSettings settings) {
        if (results.isEmpty() || results.get(results.size() - 1).getAlternativesList().isEmpty()) {
            return "No results.";
        }

        StringBuilder transcript = new StringBuilder();

        // without diarization
        if (!settings.withDiarization) {
            for (SpeechRecognitionResult result : results) {
                if (!result.getAlternativesList().isEmpty()) {
                    SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                    transcript.append(" "+ alternative.getTranscript()+" ");
                }
            }

            if (!settings.withAutomaticPunctuation) {
                return transcript.toString().toLowerCase().replaceAll("[.,!?;:]", "");
            }
            return transcript.toString();
        }

        // with diarization enabled
        SpeechRecognitionAlternative lastAlternative = results.get(results.size() - 1).getAlternativesList().get(0);
        List<WordInfo> words = lastAlternative.getWordsList();
        if (words.isEmpty()) {
            return "No words recognized.";
        }

        String currentSpeaker = words.get(0).getSpeakerLabel();
        StringBuilder currentPhrase = new StringBuilder();

        currentPhrase.append(words.get(0).getWord());

        for (int i = 1; i < words.size(); i++) {
            WordInfo wordInfo = words.get(i);
            String speaker = wordInfo.getSpeakerLabel();
            String word = wordInfo.getWord();

            if (speaker.equals(currentSpeaker)) {
                if (word.matches("^[^a-zA-Z0-9].*")) {
                    currentPhrase.append(word);
                } else {
                    currentPhrase.append(" "+word);
                }
            } else {
                transcript.append("Speaker "+currentSpeaker+": "+currentPhrase.toString().trim().toLowerCase().replaceAll("[.,!?;:]", "")+"\n");

                currentSpeaker = speaker;
                currentPhrase = new StringBuilder(word);
            }
        }
        transcript.append("Speaker "+currentSpeaker+": "+currentPhrase.toString().trim().toLowerCase().replaceAll("[.,!?;:]", "")+"\n");

        if (!settings.withAutomaticPunctuation) {
            return transcript.toString();
        }

        return transcript.toString();
    }


    
    @Override
    public List<Transcription> findAll() {
        return transcriptionRepo.findAll();
    }

    
    @Override
    public Page<Transcription> findAllByAuth0Id(String auth0id, Pageable pageable) {
        return transcriptionRepo.findAllByAuth0Id(auth0id, pageable);
    }


    
    @Override
    public Transcription save(Transcription tr) throws Exception {
        if (tr.getTitle().isEmpty() || tr.getContent().isEmpty() && tr.getSummary().isEmpty()) {
            throw new Exception("Title and content must be set.");
        }
        if (tr.getCreationDate() == null) {
            tr.setCreationDate(LocalDate.now());
        }
        return transcriptionRepo.save(tr);
    }


    
    @Override
    public Transcription update(Transcription transcription) {
        return transcriptionRepo.update(transcription);
    }



    @Override
    public boolean delete(String id) {
        return transcriptionRepo.delete(id);
    }

}