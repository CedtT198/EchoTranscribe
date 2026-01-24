import api from "./api";

export interface UserFilter {
    name: string,
    firstName: string,
    mail: string,
    startDate: string,
    endDate: string,
    country: string
}

export const filterDefault: UserFilter =  {
    name: "",
    firstName: "",
    mail: "",
    startDate: "",
    endDate: "",
    country: ""
}

export const getUsers = async (filter: UserFilter, page: number, size: number) => {
    try {
        return await api.post(`/user/findByFilters?page=${page}&size=${size}&sort=creationDate,desc`, filter)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}



export const getUsersDashboardStat = async (startDate: any, endDate: any) => {
    if (startDate === undefined) startDate = "";
    if (endDate === undefined) endDate = "";

    try {
        return await api.get(`/dashboard/getUsersStat?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

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

export const updateUser = async (formData: User) => {
    try {
        return api.post(`/user/update`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const saveUser = async (formData: User) => {
    try {
        return api.post(`/user/save`, formData);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface User {
    id: string,
    auth0_id: string,
    name: string,
    first_name: string,
    country: string,
    city: string,
    zip: string,
    address: string,
    mail: string,
    birthday: string,
    creation_date: string,
    last_update: string
}