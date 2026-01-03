package com.speech_to_text.application.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.google.cloud.speech.v2.*;
import com.google.cloud.speech.v2.SpeechAdaptation.AdaptationPhraseSet;
import com.google.protobuf.ByteString;
// import com.google.cloud.speech.v1.*;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettingsDTO;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscriptionService implements TranscriptionUseCase {

    private final MediaFileUseCase mediaFileUseCase;

    @Override
    public String stream(MultipartFile file, TranscribeSettingsDTO settings) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'stream'");
    }
    

    @Override
    public String transcribeLongFile(MultipartFile file, TranscribeSettingsDTO settings) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'transcribeLongFile'");
    }


    @Override
    public String transcribeShortFile(MultipartFile file, TranscribeSettingsDTO settings) throws Exception {

        ByteString convertedFile = mediaFileUseCase.convertAudiotoFLAC(file);
        System.out.println("Conversion/Extraction audio from video done.");
        
        String location = "eu";
        String projectId = "echotranscribe";
        String recognizer = String.format("projects/%s/locations/%s/recognizers/_", projectId, location);

        try (SpeechClient speechClient = SpeechClient.create(
            SpeechSettings.newBuilder()
                .setEndpoint(location + "-speech.googleapis.com:443")
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
            // return "done, check server"; 
            return formatTranscript(response, settings.withDiarization);
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        // return "";
    }


    private RecognitionConfig buildConfig(TranscribeSettingsDTO settings) {
        RecognitionFeatures.Builder features = RecognitionFeatures.newBuilder();

        RecognitionConfig.Builder config = RecognitionConfig.newBuilder()
            .setAutoDecodingConfig(AutoDetectDecodingConfig.newBuilder().build())
            .addLanguageCodes(settings.mainLanguage)
            .setModel(settings.model);

            features.setEnableAutomaticPunctuation(settings.withAutomaticPunctuation)
                                .setMaxAlternatives(1)
                                .setProfanityFilter(settings.filterProfanity);
                                // .setUseEnhanced(settings.useEnhanced) // tamin'ny v1
                                // .setEnableWordTimeOffsets(true)  // Better for sub-title
                                // .setEnableWordConfidence(true);
        
        if (settings.useAlternativeLanguages && settings.alternativeLanguages != null && !settings.alternativeLanguages.isEmpty()) {
            config.addAllLanguageCodes(settings.alternativeLanguages);
        }
        
        if (settings.withDiarization) {
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


    private String formatTranscript(RecognizeResponse response, boolean withDiarization) {
        StringBuilder transcript = new StringBuilder();

        if (!withDiarization) {
            for (SpeechRecognitionResult result : response.getResultsList()) {
                if (!result.getAlternativesList().isEmpty()) {
                    SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                    transcript.append(" "+ alternative.getTranscript()+" ");
                    // transcript.append(result.getAlternativesList().get(0).getTranscript()).append(" ");
                }
            }
            return transcript.toString();
        }

        List<SpeechRecognitionResult> results = response.getResultsList();
        if (results.isEmpty() || results.get(results.size() - 1).getAlternativesList().isEmpty()) {
            return "No results.";
        }

        SpeechRecognitionAlternative lastAlternative = results.get(results.size() - 1).getAlternativesList().get(0);

        List<WordInfo> words = lastAlternative.getWordsList();
        if (words.isEmpty()) {
            return "No words recognized.";
        }

        String currentSpeaker = words.get(0).getSpeakerLabel();
        transcript.append("Speaker ").append(currentSpeaker).append(": ").append(words.get(0).getWord());

        for (int i = 1; i < words.size(); i++) {
            WordInfo wordInfo = words.get(i);
            String speakerTag = wordInfo.getSpeakerLabel();

            if (speakerTag == currentSpeaker) {
                transcript.append(" ").append(wordInfo.getWord());
            } else {
                transcript.append("\nSpeaker ").append(speakerTag).append(": ").append(wordInfo.getWord());
                currentSpeaker = speakerTag;
            }
        }

        return transcript.toString();
    }

}
