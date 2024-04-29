"use client";
import { Button } from "@/components/ui/button";
import { UploadFileResponse } from "@/types/uploadthingTypes";
import { X } from "lucide-react";
import Image from "next/image";
import React, { FC, SetStateAction } from "react";

type UploadedFilePreviewProps = {
  response: UploadFileResponse;
  setFileResponse: (value: SetStateAction<UploadFileResponse[]>) => void;
};

const UploadedFilePreview: FC<UploadedFilePreviewProps> = ({
  response,
  setFileResponse,
}) => {
  return (
    <div
      key={response?.key}
      className="relative w-full flex items-center gap-4 border border-borderColor rounded-lg p-2"
    >
      <Button
        variant={"outline"}
        size="icon"
        className="absolute -right-2 -top-2 w-6 h-6 rounded-full"
        onClick={() =>
          setFileResponse((prev) =>
            prev.filter(({ key }) => key !== response?.key)
          )
        }
        type="button"
      >
        <X className="w-4 h-4 text-gray" />
      </Button>
      <Image
        src={response?.type?.includes("image") ? response?.url : "/pdf.png"}
        alt="announcement-icon"
        width="40"
        height="40"
      />
      <div>
        <p className="text-sm">{response?.name}</p>
        <p className="text-xs text-secondary-grayText">
          {response?.type.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default UploadedFilePreview;
