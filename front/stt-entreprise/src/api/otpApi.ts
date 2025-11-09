import { SERVER_URL } from "../components/Global";

export const verifyCode = async (formData: {mail?: string; code?: string}) => {
    const response = fetch(`${SERVER_URL}/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    return response;
}