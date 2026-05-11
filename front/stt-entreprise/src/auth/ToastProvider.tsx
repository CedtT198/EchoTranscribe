import { createContext, useContext, useState, type ReactNode } from "react";

type ToastType = "success" | "error";

interface ToastContextType {
    success: string | null;
    error: string | null;
    info: string | null;
    setSuccess: (message: string) => void;
    setError: (message: string) => void;
    setInfo: (message: string) => void;
    clearToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [success, setSuccessState] = useState<string | null>(null);
    const [error, setErrorState] = useState<string | null>(null);
    const [info, setInfoState] = useState<string | null>(null);

    const setSuccess = (message: string) => {
        setErrorState(null);
        setSuccessState(message);
    };

    const setError = (message: string) => {
        setSuccessState(null);
        setErrorState(message);
    };
    
    const setInfo = (message: string) => {
        setSuccessState(null);
        setInfoState(message);
    };

    const clearToast = () => {
        setSuccessState(null);
        setErrorState(null);
    };

    return (
        <ToastContext.Provider value={{ success, error, info, setInfo, setSuccess, setError, clearToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
