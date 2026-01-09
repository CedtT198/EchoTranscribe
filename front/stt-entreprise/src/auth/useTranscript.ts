import axios from 'axios';
import { useRef, useState } from 'react';
import { getStatusTranscription, transcribeLongFile } from '../api/transcription';

interface Status {
  status: string; // 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  progress: number;
  transcript?: string;
  error?: string;
}

interface UseLongTranscriptionReturn {
  startTranscription: (fd: any) => Promise<void>;
  stopPolling: (message?: string) => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  status: Status | null;
  isLoading: boolean;
  isPolling: boolean;
  transError: string | null;
}

export const useTranscript = (): UseLongTranscriptionReturn => {
  const [status, setStatus] = useState<Status | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [transError, setError] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  const intervalRef = useRef<number  | null>(null);
  const timeoutRef = useRef<number  | null>(null);

  const startPolling = (id: string) => {
    setTaskId(id);
    setIsPolling(true);
    setError(null);
    setIsLoading(false); 

    const interval = setInterval(async () => {
      try {
        const response = await getStatusTranscription(id);
        const data: Status = response.data;

        setStatus(data);

        if (data.status === 'COMPLETED' || data.status === 'ERROR') {
          clearInterval(interval);
          setIsPolling(false);
        }
      } catch (err) {
        console.error('Error polling:', err);
        clearInterval(interval);
        setIsPolling(false);
        setError('Erreur de connexion lors du suivi');
      }
    }, 500);

    getStatusTranscription(id);
  };

  const stopPolling = async (message?: string) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPolling(false);
    if (message) setError(message);
  };

  const startTranscription = async (fd: any) => {
    // setIsLoading(true);
    setStatus(null);
    setError(null);
    setIsPolling(false);

    try {
      const res = await transcribeLongFile(fd);
      console.log(res.data.taskId);
      const receivedTaskId = res.data.taskId;
      if (receivedTaskId) {
        startPolling(receivedTaskId);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.error || 'Error sending file.');
    }
  };

  return {
    startTranscription,
    setIsLoading,
    stopPolling,
    status,
    isLoading,
    isPolling,
    transError,
  };
};