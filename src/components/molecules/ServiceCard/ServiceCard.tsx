import React from "react";
import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { ServiceCardProps } from "@/types/Services";

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const lang = useLanguage();
  return (
    <div
      key={service.id}
      className="bg-white text-start h-[300px] w-full relative"
    >
      <CustomImage
        src={service.service.images[0]?.url || "/default.png"}
        alt={service.service[`name_${lang}`] || service.service.name_en}
        className="object-cover mb-4"
        fill
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-end justify-center">
        <Text className="text-xl text-white pb-8">
          {service.service[`name_${lang}`] || service.service.name_en}
        </Text>
      </div>
    </div>
  );
};

export default ServiceCard;
