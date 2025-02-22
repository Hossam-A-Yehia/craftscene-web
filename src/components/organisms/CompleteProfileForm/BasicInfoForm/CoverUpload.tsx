import React from "react";
import Button from "@/components/atoms/Button/Button";
import { useFileUploader } from "@/hooks/useFileUploader";
import { MdOutlineModeEdit } from "react-icons/md";

const CoverUpload = ({
  setFieldValue,
  name,
  defaultValue,
  defaultImage,
}: {
  setFieldValue: any;
  name: string;
  defaultValue?: File | null;
  defaultImage?: string;
}) => {
  const { getInputProps, getRootProps, fileList } = useFileUploader({
    onChange: (files) => {
      setFieldValue(name, files[0]);
    },
    accept: {
      image: [".jpg", ".jpeg", ".png"],
    },
    maxSize: 2 * 1024 * 1024,
    defaultValue,
  });
  const previewImage = fileList[0]?.preview || defaultImage || "/profile.png";
  return (
    <div className="w-full h-64 relative" data-testid="profile">
      <img
        className="w-full h-full object-cover rounded-lg"
        src={previewImage}
        alt="Cover preview"
      />
      <div
        {...getRootProps()}
        className="absolute top-4 right-4   flex items-center justify-center"
      >
        {" "}
        <input {...getInputProps()} />
        <Button
          type="button"
          variant="main"
          additionalClasses="!rounded-full !w-8 !h-8 !p-0"
        >
          <MdOutlineModeEdit className="text-sm text-white" />
        </Button>
      </div>
    </div>
  );
};

export default CoverUpload;
