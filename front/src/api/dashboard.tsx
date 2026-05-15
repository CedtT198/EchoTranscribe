import api from "./api";

export const getDashboardStat = async (startDate: any, endDate: any) => {
    if (startDate === undefined) startDate = "";
    if (endDate === undefined) endDate = "";

    try {
        return await api.get(`/dashboard/getGeneralStat?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface MonthlyCount {
    month_year: string,
    count: number
}
