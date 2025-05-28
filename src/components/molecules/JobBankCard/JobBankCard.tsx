import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import Link from "next/link";
import React from "react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

interface CardProps {
  id: number;
  profileImage: string;
  name: string;
  logo: string;
  location: string;
  email: string;
  phone: string;
}

const JobBankCard: React.FC<CardProps> = ({
  id,
  profileImage,
  name,
  logo,
  location,
  email,
  phone,
}) => {
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
          <Link href={`business-user/${id}?from=job-bank`}>
            <Text className="underline mt-4 text-lg font-semibold text-gray-900 text-center truncate">
              {name.length > 25 ? `${name.slice(0, 25)}...` : name}
            </Text>
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <MdLocationOn className="text-main" size={20} />
            <Text className="text-sm">{location}</Text>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MdEmail className="text-main" size={20} />
            <Text className="text-sm">{email}</Text>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MdPhone className="text-main" size={20} />
            <Text className="text-sm">{phone}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBankCard;
