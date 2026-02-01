import type React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        // 🔒 Disable background scroll
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            // 🔓 Restore background scroll
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    const handleBackdropClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    );
}
