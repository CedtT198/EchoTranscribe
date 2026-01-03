import axios from "axios";
// import { apiPost } from "./api";

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