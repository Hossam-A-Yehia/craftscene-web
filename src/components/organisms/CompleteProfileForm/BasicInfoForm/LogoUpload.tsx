import React from "react";
import Button from "@/components/atoms/Button/Button";
import { useFileUploader } from "@/hooks/useFileUploader";
import { MdOutlineModeEdit } from "react-icons/md";

const LogoUpload = ({
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

  const previewImage =
    fileList[0]?.preview || defaultImage || "/default-logo.png";

  return (
    <div className="flex justify-center " data-testid="logo">
      <div className="w-36 h-36 relative rounded-full  -translate-y-1/2 border-[2px] border-[#F05B204A]">
        {" "}
        <div className="w-full h-full overflow-hidden rounded-full ">
          <img className="w-full h-full object-cover" src={previewImage} />
        </div>
        <div
          {...getRootProps()}
          className="absolute right-[6%] bottom-[6%]   flex items-center justify-center z-10 h-fit w-fit"
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
    </div>
  );
};

export default LogoUpload;
