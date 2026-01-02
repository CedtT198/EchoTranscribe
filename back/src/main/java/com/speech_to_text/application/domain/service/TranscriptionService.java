package com.speech_to_text.application.domain.service;

import java.util.List;
import java.io.IOException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.SpeechContext;
import com.google.cloud.speech.v2.RecognitionConfig;
import com.google.cloud.speech.v2.RecognizeResponse;
import com.google.cloud.speech.v2.SpeakerDiarizationConfig;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechRecognitionAlternative;
import com.google.cloud.speech.v2.SpeechRecognitionResult;
import com.google.cloud.speech.v2.WordInfo;
// import com.google.cloud.speech.v1.RecognitionAudio;
// import com.google.cloud.speech.v1.RecognitionConfig;
// import com.google.cloud.speech.v1.RecognizeResponse;
// import com.google.cloud.speech.v1.SpeakerDiarizationConfig;
// import com.google.cloud.speech.v1.SpeechClient;
// import com.google.cloud.speech.v1.SpeechContext;
// import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
// import com.google.cloud.speech.v1.SpeechRecognitionResult;
// import com.google.cloud.speech.v1.WordInfo;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettingsDTO;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscriptionService implements TranscriptionUseCase {

    private final MediaFileUseCase mediaFileUseCase;

    @Override
    public String transcribe(MultipartFile file, TranscribeSettingsDTO settings) throws IOException, InterruptedException {

        ByteString convertedFile = mediaFileUseCase.convertAudiotoFLAC(file);
        System.out.println("Conversion/Extraction audio from video done.");

        try (SpeechClient speechClient = SpeechClient.create()) {
            RecognitionConfig config = buildConfig(settings);
            RecognitionAudio audio = RecognitionAudio.newBuilder()
                .setContent(convertedFile)
                .build();

            // Appel synchrone
            RecognizeResponse response = speechClient.recognize(config, audio);
            return formatTranscript(response, settings.withDiarization);
        }
        catch (Exception e) {
            throw new RuntimeException("Error transcribing", e);
        }
    }


    private RecognitionConfig buildConfig(TranscribeSettingsDTO settings) {
        RecognitionConfig.Builder config = RecognitionConfig.newBuilder()
            .setEncoding(RecognitionConfig.AudioEncoding.FLAC)
            .setSampleRateHertz(16000)
            .setLanguageCode(settings.mainLanguage)
            .setAudioChannelCount(1)

            .setModel(settings.model)
            .setUseEnhanced(settings.useEnhanced)  
            .setEnableAutomaticPunctuation(settings.withAutomaticPunctuation)
            // .setEnableWordTimeOffsets(true)  // Better for sub-title
            // .setEnableWordConfidence(true)
            .setMaxAlternatives(1)  // Alternatives
            .setProfanityFilter(settings.filterProfanity);
        
        if (settings.useAlternativeLanguages && settings.alternativeLanguages != null && !settings.alternativeLanguages.isEmpty()) {
            config.addAllAlternativeLanguageCodes(settings.alternativeLanguages);
        }
        
        if (settings.withDiarization) {
            config.setDiarizationConfig(SpeakerDiarizationConfig.newBuilder()
                .setEnableSpeakerDiarization(true)
                .setMinSpeakerCount(settings.minPeople)
                .setMaxSpeakerCount(settings.maxPeople)
                .build());
        }

        if (settings.useSpeechContexts) {
            SpeechContext.Builder speechContextBuilder = SpeechContext.newBuilder();
            speechContextBuilder.setBoost(settings.boostSpeechContexts);

            for (String phrase : settings.speechContextsPhrases) {
                speechContextBuilder.addPhrases(phrase);
            }
            config.addSpeechContexts(speechContextBuilder.build());
        }
        return config.build();
    }


    private String formatTranscript(RecognizeResponse response, boolean withDiarization) {
        StringBuilder transcript = new StringBuilder();

        if (!withDiarization) {
            for (SpeechRecognitionResult result : response.getResultsList()) {
                if (!result.getAlternativesList().isEmpty()) {
                    transcript.append(result.getAlternativesList().get(0).getTranscript()).append(" ");
                }
            }
            return transcript.toString().trim();
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
