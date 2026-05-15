import { useEffect } from "react";

interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({type, message, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`toast-perso toast-${type}`}>
            <span className={`fe fe-info fe-16 mr-2`}/>{message}
            {/* <span className={`fe fe-${type === "success" ? "check" : "x"} fe-16 mr-2`}/>{message} */}
        </div>
    )
}
