import api from "./api";

export const getPerformanceDashboardStat = async (startDate: any, endDate: any) => {
    if (startDate === undefined) startDate = "";
    if (endDate === undefined) endDate = "";

    try {
        return await api.get(`/dashboard/getPerformanceStat?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getTranscriptions = async (filter: TranscriptionFilter, page: number, size: number) => {
    try {
        return await api.post(`/transcription/findByFilters?page=${page}&size=${size}&sort=createdDate,desc`, filter)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface TranscriptionFilter {
    auth0Id: string
    startDate: string
    endDate: string
    contentPhrase: string
    summaryPhrase: string
    transcriptionType: string
}

export const filterDefault: TranscriptionFilter = {
    auth0Id: "",
    startDate: "",
    endDate: "",
    contentPhrase: "",
    summaryPhrase: "",
    transcriptionType: ""
}

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

export const transcribeShortFile = async (formData: any) => {
    try {
        return await api.post('/transcription/shortfile', formData)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getStatusTranscription = async (taskId: any) => {
    // console.log("maka status");
    try {
        return await api.get(`/transcription/longfile/status/${encodeURIComponent(taskId)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const transcribeLongFile = async (formData: any) => {
    try {
        return await api.post('/transcription/longfile', formData)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}