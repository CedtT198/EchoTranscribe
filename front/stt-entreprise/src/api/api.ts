import { SERVER_URL } from "../components/Global";

export const apiGet = async (url: string, token?: any) => {
    console.log('TOKEN '+token);

    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${SERVER_URL}${url}`, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        throw new Error(`GET ${url} failed (${response.status})`);
    }
    return response.json();
}

export const apiPost = async (url: string, data: T, token?: string) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${SERVER_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`POST ${url} failed (${response.status})`);
    }

    // const response = await fetch(`${SERVER_URL}${url}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    // });
    return response.json();
}