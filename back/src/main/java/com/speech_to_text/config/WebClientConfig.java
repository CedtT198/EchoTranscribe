package com.speech_to_text.config;

import java.net.URL;
import javax.net.ssl.HttpsURLConnection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient(@Value("${openai.api-key}") String apiKey) {
        // System.out.println("OPENAI_API_KEY: " + apiKey);
        try {
            URL url = new URL("https://api.openai.com/v1/models");
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", "Bearer " +apiKey);
            // System.out.println("Response code: " + con.getResponseCode());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
