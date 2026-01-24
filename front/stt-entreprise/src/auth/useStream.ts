import { useRef, useState } from 'react';
import type { FormDataTranscription } from '../api/transcription';
import { useAuth0 } from '@auth0/auth0-react';
import { useToast } from './ToastProvider';

export const useStream = (streamingSettings: FormDataTranscription) => {
    const [recording, setRecording] = useState(false);
    const {setError} = useToast();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const [transcripts, setTranscripts] = useState<string[]>([]);
    const [currentInterim, setCurrentInterim] = useState<string>('');
    
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
                        console.log('Server got the messsage.');
                        break;

                    case 'transcript':
                        if (data.isFinal) {
                            console.log('Transcription:', data.transcript, 'final:', data.isFinal);
                            // setTranscripts(prev => [...prev,`[${data.isFinal ? 'FINAL' : 'INTERIM'}] ${data.transcript}`]);
                            setTranscripts(prev => [...prev, data.transcript.trim()]);
                            setCurrentInterim('');
                        }
                        else {
                            setCurrentInterim(data.transcript.trim());
                        }
                        break;

                    case 'error':
                        console.error('Error:', data.message);
                        setError('Error: ' + data.message);
                        break;

                    default:
                        if (data.isFinal) {
                            console.log('Transcription:', data.transcript, 'final:', data.isFinal);
                            setTranscripts(prev => [...prev, data.transcript.trim()]);
                            setCurrentInterim('');
                        }
                        else {
                            setCurrentInterim(data.transcript.trim());
                        }
                        break;
                    }
                } catch (e) {
                    console.log('Message received is not JSON:', event.data);
                }
            }
        };


        ws.onclose = () => {
            stopRecording();
            console.log('WebSocket closed.')
        };
        ws.onerror = (error:any) => setError(error);

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
    currentInterim,
  };
};