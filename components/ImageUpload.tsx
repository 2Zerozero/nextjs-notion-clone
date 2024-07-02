"use clinet";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

// 전역 설정
declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  isOpen: boolean;
  onClose: () => void;
}

const uploadPreset = "f0wmnm4u";

const ImageUpload = ({
  onChange,
  value,
  isOpen,
  onClose,
}: ImageUploadProps) => {
  // 특정 의존성이 변경될 때 새로 생성
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );

  if (!isOpen) return null;
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
            className="fixed left-[30%] top-[25vh] z-[99999] mx-auto my-4 h-[200px] w-1/2 max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-md md:left-[50%] md:w-1/4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => open()}
              className="z-20 mx-auto flex h-full w-4/5 cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 text-neutral-600 transition hover:opacity-70"
            >
              <ImagePlus size={50} />
              Click to Upload
            </div>

            <X
              onClick={() => onClose()}
              size={30}
              className="absolute -right-3 -top-3"
            />

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
