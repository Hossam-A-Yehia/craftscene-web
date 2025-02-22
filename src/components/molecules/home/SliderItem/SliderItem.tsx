import Image from "@/components/atoms/Image/CustomImage";
import { SliderItemProps } from "@/types/Molecules";
import React from "react";

const SliderItem: React.FC<SliderItemProps> = ({ imageUrl, altText }) => {
  return (
    <div className="swiper-slide">
      <Image src={imageUrl} alt={altText} />
    </div>
  );
};

export default SliderItem;
