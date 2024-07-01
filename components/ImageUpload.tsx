"use clinet";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  let cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const uploadPreset = "ogtoygpf";

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  // 특정 의존성이 변경될 때 새로 생성
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-e-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
            onClick={() => open?.()}
          >
            <ImagePlus size={50} />
            <div className="text-lg font-semibold">Click to Upload</div>
            {value && (
              <div className="absoulte inset-0 h-full w-full">
                <Image
                  style={{ objectFit: "cover" }}
                  fill
                  src={value}
                  alt="Cover Image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
