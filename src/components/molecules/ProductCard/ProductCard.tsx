import React from "react";
import CustomImage from "@/components/atoms/Image/CustomImage";
import NavLink from "@/components/atoms/NavLink/NavLink";
import Text from "@/components/atoms/Text/Text";
import { IoIosArrowForward } from "react-icons/io";
import { t } from "i18next";

interface CardProps {
  imageUrl: string;
  altText: string;
  link: string;
  title: string;
  supplier: string;
}

const ProductCard: React.FC<CardProps> = ({
  imageUrl,
  altText,
  link,
  title,
  supplier,
}) => {
  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#E9E7E72E] hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-[250px] overflow-hidden">
        <CustomImage src={imageUrl} alt={altText} fill />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Text className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </Text>
        </div>
        <p className="text-sm text-gray-500 mt-1">Supplier: {supplier}</p>
        <NavLink classN="text-xs mt-2 flex items-center" href={link}>
          {t("products.view_details")} <IoIosArrowForward />
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
