import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FileUploadProps {
  onChange: (ur?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}
const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType != "pdf") {
    return (
      <div className="relative h-20 w-20 right-0  ">
        <img
          src={value}
          alt="Upload"
          className="rounded-full object-cover w-full h-full"
        />{" "}
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 bg-rose-500 text-white rounded-full shadow-sm"
          type="button"
        >
          <X />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("res:::: ", res);
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log("error::: ", error);
      }}
    />
  );
};
export default FileUpload;
