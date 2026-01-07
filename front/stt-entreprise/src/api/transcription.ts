import axios from "axios";
// import { apiPost } from "./api";

export interface SettingsModalProps {
    settings: FormDataTranscription;
    setSettings: React.Dispatch<React.SetStateAction<FormDataTranscription>>;
}


export interface FormDataTranscription {
    type: string,
    mainLanguage: string, 
    useAlternativeLanguages: boolean,  
    alternativeLanguages: string[], 
    withAutomaticPunctuation: boolean,
    withWordTimeOffsets: boolean,  
    withWordConfidence: boolean,  
    filterProfanity: boolean,
    withInterimResults?: boolean,
    voiceActivityTimeoutSeconds: number, 
    useSpeechContexts: boolean,
    boostSpeechContexts: number,
    speechContextsPhrases: string[],
    withDiarization: boolean,
    minPeople: number,
    maxPeople: number
}

export const streamingDefault: FormDataTranscription = {
  type: "streaming",
  mainLanguage: "en-US",
  useAlternativeLanguages: false,
  alternativeLanguages: [],
  withAutomaticPunctuation: true,
  withWordTimeOffsets: false,
  withWordConfidence: false,
  filterProfanity: true,
  withInterimResults: true,
  voiceActivityTimeoutSeconds: 20,
  useSpeechContexts: false,
  boostSpeechContexts: 0,
  speechContextsPhrases: [],
  withDiarization: false,
  minPeople: 1,
  maxPeople: 1
};

export const batchDefault: FormDataTranscription = {
  type: "file",
  mainLanguage: "en-US",
  useAlternativeLanguages: false,
  alternativeLanguages: [],
  withAutomaticPunctuation: true,
  withWordTimeOffsets: false,
  withWordConfidence: false,
  filterProfanity: true,
  withInterimResults: false,
  voiceActivityTimeoutSeconds: 0,
  useSpeechContexts: false,
  boostSpeechContexts: 0,
  speechContextsPhrases: [],
  withDiarization: false,
  minPeople: 1,
  maxPeople: 1
};

export const getTranscriptionSettings = async (auth0id: any, token: any) => {
    try {
        return await axios.post(`http://localhost:8080/transcription/settings'/${encodeURIComponent(auth0id)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const transcribeShortFile = async (formData: any, token: any) => {
    try {
        return await axios.post('http://localhost:8080/transcription/shortfile', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getStatusTranscription = async (taskId: any, token: any) => {
    try {
        return await axios.get(`http://localhost:8080/transcription/longfile/status/${encodeURIComponent(taskId)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const transcribeLongFile = async (formData: any, token: any) => {
    try {
        return await axios.post('http://localhost:8080/transcription/longfile', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    } catch (error) {
        throw new Error((error as Error).message);
    }
}