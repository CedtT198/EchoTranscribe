import { useState } from "react";
import { useToast } from "../../../../auth/ToastProvider";
import { save, type Summary } from "../../../../api/summary";
import { useAuth0 } from "@auth0/auth0-react";
import type { AxiosError } from "axios";

interface SaveButtonProps {
  transcription: Summary | null;
}

interface ApiResponse {
  success?: string;
  error?: string;
}

export default function SaveButton({ transcription }: SaveButtonProps) {
    const { isAuthenticated } = useAuth0();
    const [saved, setSaved] = useState<boolean>(false);
    const { setSuccess, setError } = useToast();

    const saveTranscription = async (tr: Summary | null): Promise<void> => {
        try {
            const res = await save(tr);
            const data = res.data;

            if (data.success) {
                setSuccess(data.success);
                setSaved(true);
            }
        } catch (err: unknown) {
            const error = err as AxiosError<ApiResponse>;

            const message = error.response?.data?.error || error.message || "Saving failed";
            setError("Saving failed: " + message);
        }
    };

    if (!isAuthenticated) return null;
    return (
        <>
            {!saved && <a className="btn btn rounded-pill mx-1 text-light" type="button" onClick={() => saveTranscription(transcription)}>
                <span className="fe fe-cloud fe-16 mr-1"></span>
                <span>Save</span>
            </a>}
        </>
    );
}