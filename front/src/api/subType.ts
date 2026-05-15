import api from "./api";

export const findAllSubType = async () => {
    try {
        return await api.get('/subscription/type/findAll');
    } catch (error) {
        throw new Error((error as Error).message);
    }
}