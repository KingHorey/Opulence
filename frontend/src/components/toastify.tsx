import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastifyProps {
  text: string;
  type: "default" | "success" | "warning" | "error" | "info";
}

export function toastify({ type, text }: ToastifyProps) {
  let notify: () => void;

  if (type === "default") {
    notify = () =>
      toast(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  } else {
    notify = () =>
      toast[type](text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }
  notify();
}
