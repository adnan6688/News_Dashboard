import toast from "react-hot-toast";

type ToastProps = {
    type: "success" | "error";
    message: string;
};

export default function Toast({ type, message }: ToastProps) {
    if (type === "success") {
        toast.success(message);
    } else {
        toast.error(message);
    }

    return null;
}