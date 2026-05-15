import api from "./api";

export interface CheckoutDTO {
  auth0id: any;
  email: any;
  plan: any;
};

export const pay = async (dto: CheckoutDTO) => {
    try {
        return await api.post(`/payment/checkout`, dto)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}