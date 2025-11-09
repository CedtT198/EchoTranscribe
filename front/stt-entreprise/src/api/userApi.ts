import { SERVER_URL } from "../components/Global";

export const saveUser = async (formData: {mail?: string; code?: string}) => {
    fetch(`${SERVER_URL}/user/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
}