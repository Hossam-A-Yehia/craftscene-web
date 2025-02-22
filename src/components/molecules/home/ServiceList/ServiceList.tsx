import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";

const services = [
  t("home.about.srv1"),
  t("home.about.srv2"),
  t("home.about.srv3"),
  t("home.about.srv4"),
];

const ServiceList = () => (
  <div className="grid grid-cols-2 gap-4 mt-7" data-testid="service-list">
    {services.map((service, index) => (
      <div key={index} className="flex items-center" data-testid="service-item">
        <BiRightArrowAlt
          className="text-main text-lg mr-2"
          data-testid="service-icon"
        />
        <Text className="font-medium text-slate-700">{service}</Text>
      </div>
    ))}
  </div>
);

export default ServiceList;
