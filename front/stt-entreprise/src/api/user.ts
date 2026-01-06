import { type FormDataUpdateUser, type FormDataUser } from "../components/Global";
import { apiGet, apiPost } from "./api";
import { SERVER_URL } from "../components/Global";

export const deleteUser = async (auth0Id: any, token: any) => {
    if (!auth0Id) throw new Error("Auth0 ID is undefined");

    const response = await fetch(
        `${SERVER_URL}/user/delete/${encodeURIComponent(auth0Id)}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
        }
    );
    return response.json();
};

// export const blockUser = async (auth0Id: string | undefined) => {
//     try {
//         return apiPost(`/user/block`, auth0Id);
//     } catch (error) {
//         throw new Error((error as Error).message);
//     }
// }

export const getMyProfile = async (token: any) => {
    try {
        return apiGet(`/user/me`, token);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

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