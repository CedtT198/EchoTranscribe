import { type FormDataUpdateUser, type FormDataUser } from "../components/Global";
import api from "./api";

export const deleteUser = async (auth0Id: any) => {
    if (!auth0Id) throw new Error("Auth0 ID is undefined");

    try {
        return api.delete(`/user/delete/${encodeURIComponent(auth0Id)}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

// export const blockUser = async (auth0Id: string | undefined) => {
//     try {
//         return api.post(`/user/block`, auth0Id);
//     } catch (error) {
//         throw new Error((error as Error).message);
//     }
// }

export const getMyProfile = async () => {
    try {
        return api.get(`/user/me`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const updateUser = async (formData: FormDataUpdateUser) => {
    try {
        return api.post(`/user/update`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const saveUser = async (formData: FormDataUser) => {
    try {
        return api.post(`/user/save`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}