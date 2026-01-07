import axios from "axios";
// import { apiPost } from "./api";

export interface FormDataSummary {
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
}

export const sumDefault: FormDataSummary = {
    file: "",
    language: "en",
    content: "",
    title: "",
    subtitle: "",
    summary: "",
    goal: "paragraph",
    length: 25,
    additional_instruction: "",
    transcription_type: "",
};
