"use client";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import React from "react";

const stats = [
  { id: 1, value: "8K+", label: t("home.stats.clients") },
  { id: 2, value: "698", label: t("home.stats.Professionals") },
  { id: 3, value: "230", label: t("home.stats.projects") },
  { id: 4, value: "8K+", label: t("home.stats.products") },
];

const Stats: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center p-8"
      data-testid="region"
      style={{
        backgroundImage: "url(/home/stats.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative rounded-lg shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 z-10">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <Text className="text-4xl font-semibold text-white">
              {stat.value}
            </Text>
            <Text className="text-md text-white pt-2">{stat.label}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
