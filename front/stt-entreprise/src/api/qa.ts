import { apiGet } from "./api";

export const findAllQA = async (url: string) => {
    try {
        return await apiGet(url);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}