import { toast } from "sonner";
import { CircleCheck, TriangleAlert } from "lucide-react";

export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
    icon: <CircleCheck className="text-primary" size={20} />,
    style: {
      background: "var(--card)",
      color: "var(--primary)",
      border: "1px solid var(--primary)",
      borderRadius: "0.125rem",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: "top-right",
    icon: <TriangleAlert className="text-red-600" size={20} />,
    style: {
      background: "var(--card)",
      color: "#dc2626",
      border: "1px solid #dc2626",
      borderRadius: "0.125rem",
    },
  });
};
