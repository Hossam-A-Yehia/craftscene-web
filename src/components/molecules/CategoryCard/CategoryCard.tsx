import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  imageUrl: string;
  name: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  name,
  link,
}) => (
  <div className="text-start h-[350px] w-full relative group overflow-hidden cursor-pointer rounded-3xl">
    <Link href={link}>
      <CustomImage
        src={imageUrl || "/default.png"}
        alt={name}
        className="object-cover mb-4 rounded-3xl duration-300 group-hover:scale-110 group-hover:rotate-2"
        fill
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex overflow-hidden justify-center items-end">
        <Text className="text-xl text-white pb-8 text-center font-bold">
          {name}
        </Text>
      </div>
    </Link>
  </div>
);

export default CategoryCard;
