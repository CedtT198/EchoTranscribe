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
    language: "",
    content: "",
    title: "",
    subtitle: "",
    summary: "",
    goal: "",
    length: "",
    additional_instruction: "",
    transcription_type: "",
};
