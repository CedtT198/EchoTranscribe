import api from "./api";


export const summarize = async (content: string, goal: string, length: string, additionalInsctruction: string, auth0id: string) => {
    try {
        return await api.post(`/summary/summarize`, {content,goal,length,additionalInsctruction,auth0id})
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const save = async (summary: Summary | null) => {
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
    id: string,
    auth0_id: string,
    file: string,
    file_duration: string,
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
    id: "",
    auth0_id: "",
    file: "",
    file_duration: "",
    language: "",
    content: "",
    title: "",
    subtitle: "",
    summary: "",
    goal: "paragraph",
    length: "short",
    additional_instruction: "",
    transcription_type: "",
    creation_date: ""
};
