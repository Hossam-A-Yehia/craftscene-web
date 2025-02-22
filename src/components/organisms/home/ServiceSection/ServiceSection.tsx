"use client";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import SERV1 from "@/assets/images/home/service1.png";
import SERV2 from "@/assets/images/home/service2.png";
import SERV3 from "@/assets/images/home/service3.png";
import SERV4 from "@/assets/images/home/service4.png";
import SharedTitle from "@/components/molecules/home/SharedTitle/SharedTitle";
import Text from "@/components/atoms/Text/Text";
import NavLink from "@/components/atoms/NavLink/NavLink";
import { t } from "i18next";

interface Service {
  title: string;
  image: StaticImageData;
  description: string;
  link: string;
}

const services: Service[] = [
  {
    title: t("home.services.card1.title"),
    image: SERV1,
    description: t("home.services.card1.desc"),
    link: "/",
  },
  {
    title: t("home.services.card2.title"),
    image: SERV2,
    description: t("home.services.card2.desc"),
    link: "/",
  },
  {
    title: t("home.services.card3.title"),
    image: SERV3,
    description: t("home.services.card3.desc"),
    link: "/",
  },
  {
    title: t("home.services.card4.title"),
    image: SERV4,
    description: t("home.services.card4.desc"),
    link: "/",
  },
];

const OurService: FC = () => {
  return (
    <div className="py-10">
      <SharedTitle text={t("home.services.title")} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {services.map((service, index) => (
          <div key={index} className="bg-white text-start">
            <Image
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="px-4 pb-4">
              <Text className="text-xl font-medium mb-2">{service.title}</Text>
              <Text className="text-gray-700 text-sm mb-4">
                {service.description}
              </Text>
              <NavLink href={service.link}>
                {t("home.services.see_more")} →
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
