import axios from "axios";
import { sumDefault, type FormDataSummary } from "./summary";
import api from "./api";

export interface FormDataToExport {
    type: string,
    transcription: FormDataSummary
}

export const exportDefault:FormDataToExport = {
    type: "",
    transcription: sumDefault
}

export const download = async (formData: FormDataToExport) => {
    try {
        const response = await api.post<Blob>(`/export/`, formData, {
            responseType: 'blob',
        });

        const disposition = response.headers['content-disposition'];
        let filename = "file";

        if (disposition && disposition.includes('filename=')) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        } else {
            switch (formData.type.toLowerCase()) {
                case 'pdf':
                    filename += '.pdf';
                    break;
                case 'docx':
                    filename += '.docx';
                    break;
                case 'txt':
                    filename += '.txt';
                    break;
            }
        }

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {        
                throw new Error('Error 400 : invalid data or issue during downloading file.');
            } else {
                throw new Error('Error from  server: '+error.message);
            }
        } else {
            throw new Error('Error: '+error);
        }
    }

    // try {
        
    // } catch (error) {
    //     throw new Error((error as Error).message);
    // }
}