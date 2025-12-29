import { SERVER_URL } from "../components/Global";

export const apiGet = async (url: string) => {
    const response = await fetch(`${SERVER_URL}${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}

export const apiPost = async (url: string, data: T) => {
    const response = await fetch(`${SERVER_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}