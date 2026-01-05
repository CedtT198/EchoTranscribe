package com.speech_to_text.application.domain.model.DTO;

import java.lang.reflect.Field;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranscribeSettingsDTO {
    // @JsonProperty("model")
    // public String model; //  can be chirp, chirp_2, chirp_3

    @JsonProperty("mainLanguage")
    public String mainLanguage;
    
    @JsonProperty("location")
    public String location;

    @JsonProperty("useAlternativeLanguages")
    public Boolean useAlternativeLanguages;

    @JsonProperty("alternativeLanguages")
    public List<String> alternativeLanguages;

    // @JsonProperty("useEnhanced")
    // public Boolean useEnhanced; // increase performance (only for v1)

    @JsonProperty("withAutomaticPunctuation")
    public Boolean withAutomaticPunctuation;

    @JsonProperty("withWordTimeOffsets")
    public Boolean withWordTimeOffsets;

    @JsonProperty("withWordConfidence")
    public Boolean withWordConfidence;

    @JsonProperty("filterProfanity")
    public Boolean filterProfanity;

    @JsonProperty("withDiarization")
    public Boolean withDiarization; // if possible, precise exactly the number of people that may be in the conversation

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
        StringBuilder sb = new StringBuilder(getClass().getSimpleName()).append(" {\n");

        Field[] fields = getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                sb.append("  ")
                .append(field.getName())
                .append(": ")
                .append(field.get(this))
                .append("\n");
            } catch (IllegalAccessException e) {
                sb.append("  ")
                .append(field.getName())
                .append(": <access denied>\n");
            }
        }

        sb.append("}");
        
        String result = sb.toString();
        System.out.println(result);
        return sb.toString();
    }
}