import { apiGet } from "./api";

export const findAllSubType = async () => {
    try {
        return await apiGet(`/subscription/type/findAll`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}