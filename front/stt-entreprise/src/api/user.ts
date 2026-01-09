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


export interface FormDataUpdateUser {
    name: string,
    first_name: string,
    old_password: string,
    new_password: string,
    confirm_new_password: string
}

export interface FormDataUser {
    name: string,
    first_name: string,
    country: string,
    city: string,
    zip: string,
    address: string,
    mail: string,
    birthday: string,
    password: string,
    confirm_password: string
}