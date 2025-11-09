import { SERVER_URL } from "../components/Global";

export const signin = async (formData: {mail?: string; password?: string}) => {
    const response = fetch(`${SERVER_URL}/sign/in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    return response;
}

export const signup = async (formData: {mail?: string; password?: string}) => {
    const response = fetch(`${SERVER_URL}/sign/up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    return response;
}

export const validate = async (formData: {mail: string; password: string; name: string; first_name: string; birthday: string; confirm_password: string}) => {
    const response = fetch(`${SERVER_URL}/sign/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    return response;
}