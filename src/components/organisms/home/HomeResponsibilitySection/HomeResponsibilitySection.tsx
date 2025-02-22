"use client";
import React from "react";
import Text from "@/components/atoms/Text/Text";
import Image from "@/components/atoms/Image/CustomImage";
import ServiceList from "@/components/molecules/home/ServiceList/ServiceList";
import ExperienceBadge from "@/components/molecules/home/ExperienceBadge/ExperienceBadge";
import IMG from "@/assets/images/home/Responsibility.png";
import { t } from "i18next";

const HomeResponsibilitySection = () => (
  <div className="bg-gray-200 h-full" data-testid="responsibility-section">
    <section className="py-10 grid grid-cols-1 md:grid-cols-2 container mx-auto">
      <div>
        <Text className="text-md font-extrabold text-main" testId="text-head">
          {t("home.about.head")}
        </Text>
        <Text
          className="text-3xl font-bold text-main w-1/2 my-4"
          testId="text-title"
        >
          {t("home.about.title1")} <br />
          <span className="text-black">{t("home.about.title2")}</span>
        </Text>
        <Text className="text-sm leading-6 text-slate-500" testId="text-desc">
          {t("home.about.desc")}
        </Text>
        <ServiceList data-testid="service-list" />
      </div>
      <div
        className="relative mx-auto md:mx-0 md:ml-auto mt-10 md:mt-0"
        data-testid="image-container"
      >
        <Image
          src={IMG}
          alt="Working"
          width={350}
          height={350}
          testId="responsibility-image"
        />
        <div
          className="absolute bottom-0 left-0 lg:bottom-10 lg:-left-32"
          data-testid="experience-badge-container"
        >
          <ExperienceBadge data-testid="experience-badge" />
        </div>
      </div>
    </section>
  </div>
);

export default HomeResponsibilitySection;
