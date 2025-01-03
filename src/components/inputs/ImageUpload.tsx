"use client"
import { FC } from "react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
  interface Cloudinary {
    open?: () => void;
    [key: string]: unknown; // If more properties are needed, define them explicitly.
  }
  let cloudinary: Cloudinary;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

interface CloudinaryUploadResult {
  info?: {
    secure_url?: string;
  };
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadResult) => {
      if (result.info?.secure_url) {
        onChange(result.info.secure_url);
      } else {
        console.error("Upload failed or secure_url is missing", result);
      }
    },
    [onChange]
  )
  return (
    <CldUploadWidget
      //@ts-expect-error error expected
      onUpload={handleUpload}
      uploadPreset="airbnb"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            p-20 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className=" absolute inset-0 w-full h-full">
                <Image fill style={{ objectFit: "cover" }} src={value} alt="House" />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload;