import { apiPost } from "./api";

export const verifyCode = async (formData: {mail?: string; code?: string}) => {
    try {        
        return apiPost(`/otp/verify`, formData);
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

export const sendCode = async (mail: string) => {
    interface otpRequest{
        email?: string;
    }
    const form: otpRequest = {
        email: mail
    }

    try {        
        return apiPost(`/otp/send`, form);
    } catch (e) {
        throw new Error((e as Error).message);
    }
}