import { useEffect, useRef, useState } from "react";
import { UploadSvg } from "../components/svg";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface uploadWidgetLink {
  link: (url: string) => void;
}

const UploadWidget: React.FC<uploadWidgetLink> = ({ link }) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "db2agmwon",
        uploadPreset: "opulence-preset",
      },
      (err: any, result: any) => {
        if (err) {
          console.error(err);
        } else {
          if (result.event === "success") {
            link(result.info.secure_url);
            widgetRef.current.close();
          }
        }
      }
    );
  }, [link]);

  return (
    <div
      className="bg-slate-50 p-2 w-[80%] h-[200px] border flex flex-col items-center justify-center mt-10 mr-auto ml-auto border-2 border-dashed border-black cursor-pointer"
      onClick={() => widgetRef.current.open()}
    >
      <UploadSvg />
      <p className="text-xl">Upload Brand Image</p>
    </div>
  );
};

export default UploadWidget;
