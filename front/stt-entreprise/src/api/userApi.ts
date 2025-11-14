import { type FormDataUpdateUser, type FormDataUser } from "../components/Global";
import { apiPost } from "./api";

export const updateUser = async (formData: FormDataUpdateUser) => {
    try {
        return apiPost(`/user/update`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const saveUser = async (formData: FormDataUser) => {
    try {
        return apiPost(`/user/save`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}