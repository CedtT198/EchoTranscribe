import { SERVER_URL } from "../components/Global";

export const apiGet = async () => {
}

export const apiPost = async (url: string, data: T) => {
    const response = await fetch(`${SERVER_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response;
}