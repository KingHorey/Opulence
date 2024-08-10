import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

const UploadWidget = () => {
  const cloudinaryRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
  }, []);
};

export default UploadWidget;
