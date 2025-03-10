import React from "react";
import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { ServiceCardProps } from "@/types/Services";
import Link from "next/link";
import { SUPPLIER } from "@/constants/constants";

const ServiceCard: React.FC<ServiceCardProps> = ({ service, userType }) => {
  const lang = useLanguage();

  return (
    <Link
      href={
        userType === SUPPLIER
          ? `/services/${service?.service?.id}/products`
          : `/ideas/${service?.service?.id}`
      }
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
    </Link>
  );
};

export default ServiceCard;
