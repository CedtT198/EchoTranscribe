import axios from "axios";
// import { apiPost } from "./api";

export const transcribeFile = async (formData: any, token: any) => {
    try {
        return await axios.post('http://localhost:8080/transcription/batch', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        // return await apiPost(`/transcription/batch`, formData, token, "multipart/form-data");
    })
    } catch (error) {
        throw new Error((error as Error).message);
    }
}