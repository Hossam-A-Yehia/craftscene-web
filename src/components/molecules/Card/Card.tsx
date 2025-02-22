import React from "react";
import Link from "next/link";
import CustomImage from "@/components/atoms/Image/CustomImage";
interface CardProps {
  imageUrl: string;
  altText: string;
  link: string;
}
const Card: React.FC<CardProps> = ({ imageUrl, altText, link }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden cursor-pointer">
      <div className="relative w-full h-full">
        <Link href={link}>
          <CustomImage
            src={imageUrl}
            alt={altText}
            fill
            className="hover:rotate-2 hover:scale-110 duration-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card;
