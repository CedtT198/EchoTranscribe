import { type FormDataUser } from "../components/Global";
import { apiPost } from "./api";

export const signin = async (formData: {mail?: string; password?: string}) => {
    try {
        return apiPost(`/sign/in`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const signup = async (formData: FormDataUser) => {
    try {
        return apiPost(`/sign/up`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

// mi-check hoe valide ve le form sa tsia
export const validate = async (formData: FormDataUser) => {
    try {
        return apiPost(`/sign/validate`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}