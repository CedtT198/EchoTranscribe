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

export const updateUser = async (formData: FormDataUser) => {
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


export const userDefault: FormDataUser = {
    id: "",
    auth0Id: "",
    name: "Rakotoarimisa",
    firstName: "Cedric Tiavina",
    country: "Madagascar",
    city: "Antananarivo",
    zip: "101",
    address: "Lot IIIG 87D Ambatolampy Ambohimanarina",
    mail: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    creationDate: ""
}

export interface FormDataUser {
    id: string,
    auth0Id: string,
    name: string,
    firstName: string,
    country: string,
    city: string,
    zip: string,
    address: string,
    mail: string,
    birthday: string,
    password: string,
    confirmPassword: string,
    creationDate: string
}