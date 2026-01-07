import { useRef, useState } from 'react';
import type { FormDataTranscription } from '../api/transcription';
import { useAuth0 } from '@auth0/auth0-react';

export const useStream = (streamingSettings: FormDataTranscription) => {
    const [recording, setRecording] = useState(false);
    const [error, setError] = useState<string>();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const [transcripts, setTranscripts] = useState<string[]>([]);
    const { user } = useAuth0();

    const startRecording = async () => {
        try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        mediaRecorderRef.current = mediaRecorder;

        const ws = new WebSocket('ws://localhost:8080/audio-stream');
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket opened.');

            const data = {
                type: "data",
                auth0id: user?.sub,
                settings: streamingSettings
            };

            ws.send(JSON.stringify(data));
            console.log('Data sent.');

            mediaRecorder.start(250);
            setRecording(true);
        };

        ws.onmessage = (event) => {
            if (typeof event.data === 'string') {
                try {
                    const data = JSON.parse(event.data);

                    switch (data.type) {
                    case 'received':
                        console.log('Serveur a bien reçu userInfo');
                        break;

                    case 'transcript':
                        console.log('Transcription:', data.transcript, 'final:', data.isFinal);
                        setTranscripts(prev => [...prev,`[${data.isFinal ? 'FINAL' : 'INTERIM'}] ${data.transcript}`]);
                        break;

                    case 'error':
                        console.error('Error:', data.message);
                        setError('Error: ' + data.message);
                        break;

                    default:
                        console.log('Message received: ', data);
                        setTranscripts(prev => [...prev,`[${data.isFinal ? 'FINAL' : 'INTERIM'}] ${data.transcript}`]);
                    }
                } catch (e) {
                    console.log('Message received is not JSON:', event.data);
                }
            }
        };


        ws.onclose = () => console.log('WebSocket closed.');
        ws.onerror = (error) => console.error(':', error);

        // Envoyer les chunks audio via WebSocket
        mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                ws.send(event.data);
            }
        };

        // Gérer la fin de l'enregistrement
        mediaRecorder.onstop = () => {
            ws?.close();
            setRecording(false);
        };
        } catch (error) {
            console.error('Error accessing the microphone: ', error);
            setError( "Error accessing the microphone: "+ error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

  return {
    startRecording,
    stopRecording,
    recording,
    transcripts,
    error,
  };
};