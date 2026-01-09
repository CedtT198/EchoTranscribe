import api from "./api";


export const save = async (summary: Summary) => {
    try {
        return await api.post(`/transcription/save`, summary)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const update = async (summary: Summary) => {
    try {
        return await api.post(`/transcription/update`, summary)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const deleteTranscription = async (id: string) => {
    try {
        return await api.delete(`/transcription/delete/${encodeURIComponent(id)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface Summary {
    file: string,
    language: string, 
    content: string, 
    title: string, 
    subtitle: string, 
    summary: string, 
    goal: string, 
    length: string, 
    additional_instruction: string,
    transcription_type: string,
    creation_date: string,
}

export const sumDefault: Summary = {
    file: "",
    language: "",
    content: "",
    title: "",
    subtitle: "",
    summary: "",
    goal: "",
    length: "",
    additional_instruction: "",
    transcription_type: "",
    creation_date: ""
};
