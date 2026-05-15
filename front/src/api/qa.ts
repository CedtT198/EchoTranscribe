import api from "./api";

export const findAllQA = async (url: string) => {
    try {
        return await api.get(url);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}