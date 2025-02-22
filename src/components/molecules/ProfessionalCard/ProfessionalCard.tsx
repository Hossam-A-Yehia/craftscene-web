import Button from "@/components/atoms/Button/Button";
import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import Link from "next/link";
import React from "react";
import { AiFillHeart, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

interface CardProps {
  image: string;
  profileImage: string;
  name: string;
  location: string;
  id: string;
}

const ProfessionalCard: React.FC<CardProps> = ({
  image,
  profileImage,
  name,
  location,
  id,
}) => {
  return (
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-[350px]">
      <div className="relative h-36">
        <div className="w-full h-full rounded-t-xl">
          <CustomImage
            src={image || "/default.png"}
            fill
            alt="Professional background"
            className="rounded-t-xl"
          />
        </div>
        <div className="absolute top-4 right-4 space-y-2 flex flex-col items-center">
          <button
            data-testid="heart-button"
            className="bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-gray-100"
          >
            <AiFillHeart size={20} />
          </button>
          <button
            data-testid="phone-button"
            className="bg-white p-2 rounded-full shadow-md text-blue-500 hover:bg-gray-100"
          >
            <AiOutlinePhone size={20} />
          </button>
          <button
            data-testid="mail-button"
            className="bg-white p-2 rounded-full shadow-md text-green-500 hover:bg-gray-100"
          >
            <AiOutlineMail size={20} />
          </button>
        </div>
      </div>
      <div className="p-4 text-center">
        <div className="relative w-20 h-20 mx-auto -mt-[55px] rounded-full border-2 border-main overflow-hidden">
          <CustomImage
            src={profileImage || "/default.png"}
            alt="Profile"
            fill
          />
        </div>
        <Text className="mt-4 text-sm sm:text-base md:text-md lg:text-xl font-semibold truncate">
          {name.length > 28 ? `${name.slice(0, 25)}...` : name}
        </Text>
        <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
          <MdLocationOn size={16} className="rtl:ml-1 ltr:mr-1 " />
          {location}
        </div>
        <div className="w-fit mx-auto mt-3">
          <Link href={`/business-user/${id}`} data-testid="view-profile-link">
            <Button variant="main">{t("professionals.view_profile")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
