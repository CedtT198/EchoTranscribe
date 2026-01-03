package com.speech_to_text.application.domain.model.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranscribeSettingsDTO {
    @JsonProperty("model")
    public String model; //  can be chirp, chirp_2, chirp_3

    @JsonProperty("mainLanguage")
    public String mainLanguage;

    @JsonProperty("useAlternativeLanguages")
    public Boolean useAlternativeLanguages;

    @JsonProperty("alternativeLanguages")
    public List<String> alternativeLanguages;

    @JsonProperty("withDiarization")
    public Boolean withDiarization;

    @JsonProperty("useEnhanced")
    public Boolean useEnhanced; // increase performance

    @JsonProperty("withAutomaticPunctuation")
    public Boolean withAutomaticPunctuation;

    @JsonProperty("withWordTimeOffsets")
    public Boolean withWordTimeOffsets;

    @JsonProperty("withWordConfidence")
    public Boolean withWordConfidence;

    @JsonProperty("filterProfanity")
    public Boolean filterProfanity;

    @JsonProperty("minPeople")
    public Integer minPeople;

    @JsonProperty("maxPeople")
    public Integer maxPeople;

    @JsonProperty("useSpeechContexts")
    public Boolean useSpeechContexts;

    @JsonProperty("boostSpeechContexts")
    public float boostSpeechContexts; // Between (10-15), 20 max

    @JsonProperty("speechContextsPhrases")
    public List<String> speechContextsPhrases;


    @Override
    public String toString() {
        String str = "model: "+model + "\nmainLanguage: " + mainLanguage + "\nuseAlternativeLanguages: "+
        useAlternativeLanguages + "\nalternativeLanguages: " + alternativeLanguages + "\nwithDiarization: " + withDiarization + "\nuseEnhanced: " + useEnhanced + "\nwithAutomaticPunctuation: "+
        withAutomaticPunctuation + "\nwithWordTimeOffsets: " + withWordTimeOffsets + "\nwithWordConfidence: " + withWordConfidence + "\nfilterProfanity: " + filterProfanity + "\nminPeople: "+
        minPeople + "\nmaxPeople: " + maxPeople + "\nuseSpeechContexts: " + useSpeechContexts + "\nboostSpeechContexts: " + boostSpeechContexts + "\nspeechContextsPhrases: " + speechContextsPhrases;        
        System.out.println(str);
        return null;
    }
}