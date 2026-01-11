"use client";

import { useTransition } from "react";

export default function ToggleActiveButton({
    id,
    isActive,
    toggleFn
}: {
    id: number;
    isActive: boolean;
    toggleFn: (id: number) => Promise<void>;
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            className={`btn btn-sm ${isActive ? "btn-warning" : "btn-secondary"
                }`}
            disabled={isPending}
            onClick={() =>
                startTransition(() => {
                    toggleFn(id);
                })
            }
        >
            {isActive ? (
                <i className="bi bi-eye-slash"></i>
            ) : (
                <i className="bi bi-arrow-repeat"></i>
            )}
        </button>
    );
}
