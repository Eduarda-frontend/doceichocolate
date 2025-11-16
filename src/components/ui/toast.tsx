import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number; // duração em ms antes de desaparecer automaticamente
    onClose?: () => void; // callback opcional ao fechar
}

export const Toast = ({ message, type = "info", duration = 3000, onClose }: ToastProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => handleClose(), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    function handleClose() {
        setVisible(false);
        if (onClose) onClose();
    }

    if (!visible) return null;

    // cores dependendo do tipo de toast
    const bgColor =
        type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-500"
            : "bg-blue-500";

    return (
        <div
            className={`fixed top-5 right-5 z-50 flex items-center justify-between px-4 py-2 rounded shadow-lg text-white ${bgColor} animate-slide-in`}
        >
            <span className="mr-4">{message}</span>
            <button onClick={handleClose} className="text-white hover:opacity-80 transition-opacity">
                <IoCloseOutline size={20} />
            </button>
        </div>
    );
};
