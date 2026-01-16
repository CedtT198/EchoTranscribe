import api from "./api";

export const pay = async (plan: any) => {
    try {
        return await api.post(`/payment/checkout?plan=${encodeURIComponent(plan)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}