export const SERVER_URL="http://localhost:8080";

export interface ValidationErrors {
  [key: string]: string;
}


export const sendNewCode = async (mail: string) => {
    interface otpRequest{
        email?: string;
    }

    const form: otpRequest = {
        email: mail
    }

    await fetch(`${SERVER_URL}/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
}