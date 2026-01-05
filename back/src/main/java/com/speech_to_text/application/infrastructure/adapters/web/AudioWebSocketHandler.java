package com.speech_to_text.application.infrastructure.adapters.web;

import java.io.IOException;
import java.nio.ByteBuffer;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.gax.rpc.ClientStream;
import com.google.cloud.speech.v2.StreamingRecognizeRequest;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettings;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AudioWebSocketHandler extends BinaryWebSocketHandler {

    private final TranscriptionUseCase transcriptionUseCase;
    private final ObjectMapper objectMapper;

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws IOException {
        ByteBuffer payload = message.getPayload();
        ByteString audioBytes = ByteString.copyFrom(payload);
        // System.out.println("Audio chunk file received size : " + audioChunk.length);

        ClientStream<StreamingRecognizeRequest> clientStream = (ClientStream<StreamingRecognizeRequest>) session.getAttributes().get("clientStream");

        if (clientStream != null) {
            // Envoyer le chunk audio
            StreamingRecognizeRequest audioRequest = StreamingRecognizeRequest.newBuilder()
                .setAudio(audioBytes)
                .build();

            clientStream.send(audioRequest);
        }
    }



    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        String payload = message.getPayload();
        try {
            JsonNode json = objectMapper.readTree(payload);
            String type = json.has("type") ? json.get("type").asText() : null;

            if ("data".equals(type)) {
                JsonNode auth0idNode = json.get("auth0id");
                JsonNode settingsNode = json.get("settings");
                
                String auth0id = objectMapper.treeToValue(auth0idNode, String.class);
                TranscribeSettings settings = objectMapper.treeToValue(settingsNode, TranscribeSettings.class);

                session.getAttributes().put("auth0id", auth0id);
                session.getAttributes().put("settings", settings);
        
                sendJson(session, "{\"type\":\"received\",\"message\":\"Settings received successfuly\"}");
            }
            else if ("endOfStream".equals(type)) {
                System.out.println("End of streaming " + session.getId());
                session.close(CloseStatus.NORMAL);
            }
            else {
                sendError(session, "Type de message inconnu : " + type);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Success WebSocket connection.");
        
        TranscribeSettings settings = (TranscribeSettings) session.getAttributes().get("settings");
        String auth0id= (String) session.getAttributes().get("auth0id");
        
        if (settings.useSavedSettings) {
            settings = transcriptionUseCase.findSettings(auth0id, "streaming");
        }
        transcriptionUseCase.initStreamingConfig(session, settings);
    }




    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        System.out.println("WebSocket connection closed.");
        // Fermez le stream Google STT
    }

    
    // util
    private void sendJson(WebSocketSession session, String json) {
        try {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(json));
            }
        } catch (IOException e) {
            System.err.println("Erreur envoi : " + e.getMessage());
        }
    }

    private void sendError(WebSocketSession session, String msg) {
        sendJson(session, "{\"type\":\"error\",\"message\":\"" + msg.replace("\"", "\\\"") + "\"}");
    }

    public void sendTranscript(WebSocketSession session, String text, boolean isFinal) {
        sendJson(session, "{\"type\":\"transcript\",\"transcript\":\"" +text.replace("\"", "\\\"") + "\",\"isFinal\":" + isFinal + "}");
    }

    
}
