package com.speech_to_text.application.domain.service.independant;

import java.io.IOException;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

public class AudioWebSocketHandler extends BinaryWebSocketHandler {
    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws IOException {
        byte[] audioChunk = message.getPayload().array();
        // Ici, traitez le chunk audio : envoyez-le à Google Speech-to-Text en streaming
        // Exemple : intégrez avec votre implémentation existante de Google STT streaming
        System.out.println("Reçu chunk audio de taille : " + audioChunk.length);

        // Pour Google STT streaming : utilisez SpeechClient et StreamingRecognizeRequest
        // (Ajoutez votre code pour pousser le chunk dans le stream Google)
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Connexion WebSocket établie");
        // Initialisez le stream Google STT ici si besoin
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        System.out.println("Connexion WebSocket fermée");
        // Fermez le stream Google STT
    }
}
