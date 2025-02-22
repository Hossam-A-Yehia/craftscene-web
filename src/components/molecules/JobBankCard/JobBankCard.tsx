import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import { File } from "@/types/User";
import { t } from "i18next";
import Link from "next/link";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

interface CardProps {
  id: number;
  profileImage: string;
  name: string;
  files: File[];
  logo: string;
}

const JobBankCard: React.FC<CardProps> = ({
  id,
  profileImage,
  name,
  files,
  logo,
}) => {
  const cvFile = Array.isArray(files)
    ? files.find((file: File) => file.type === 1)
    : null;
  return (
    <div className="relative max-w-lg mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative w-full h-32 ">
        <CustomImage
          src={profileImage || "/default.png"}
          alt="Profile Cover"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center -mt-16">
          <div className="relative w-24 h-24 overflow-hidden rounded-full border-4 border-white shadow-md">
            <CustomImage
              src={logo || "/default.png"}
              alt={`${name}'s logo`}
              fill
            />
          </div>
          <Link href={`business-user/${id}`}>
            <Text className=" underline mt-4 text-lg font-semibold text-gray-900 text-center truncate">
              {name.length > 25 ? `${name.slice(0, 25)}...` : name}
            </Text>
          </Link>
        </div>
        <div className="mt-6 bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-md text-sm font-bold">
              PDF
            </div>
            {cvFile ? (
              <p
                className="text-sm font-medium text-gray-700"
                data-testId="Download CV"
              >
                {t("job_bank.download_cv")}
              </p>
            ) : (
              <p
                className="text-sm font-medium text-gray-700"
                data-testId="No resume"
              >
                {t("job_bank.no_resume")}
              </p>
            )}
          </div>
          {cvFile?.url && (
            <Link
              href={cvFile?.url || "#"}
              download
              target="_blank"
              className="text-blue-600 hover:text-blue-700 transition-colors flex items-center"
              aria-label={`Download ${name}'s CV`}
            >
              <AiOutlineDownload size={28} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBankCard;
