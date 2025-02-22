"use client";
import Button from "@/components/atoms/Button/Button";
import SharedTitle from "@/components/molecules/home/SharedTitle/SharedTitle";
import SubscriptionCard from "@/components/molecules/home/SubscriptionCard/SubscriptionCard";
import { useLanguage } from "@/hooks/useLanguage";
import { PackageData, PackageType } from "@/types/Packages";
import { t } from "i18next";
import React from "react";

export default function PackegesSection({
  packegesData,
}: {
  packegesData: PackageData;
}) {
  const packeges = packegesData?.payload?.data;

  const lang = useLanguage();
  return (
    <div
      className="bg-[#F6F7FC] py-10 min-h-screen"
      data-testid="packages-section"
    >
      <section className="flex flex-col items-center container mx-auto">
        <SharedTitle
          text={t("home.packeages.title")}
          data-testid="shared-title"
        />
        <div
          className="grid gap-8 md:grid-cols-3 mt-8"
          data-testid="packages-grid"
        >
          {packeges?.slice(0, 3)?.map((pkg: PackageType) => (
            <SubscriptionCard
              key={pkg.id}
              title={pkg[`name_${lang}`] || pkg.name_en}
              description={pkg[`desc_${lang}`] || pkg.desc_en}
              price={pkg.price}
              features={[
                {
                  text: `${pkg.no_ideas} Ideas`,
                  included: pkg.no_ideas !== 0,
                },
                {
                  text: `${pkg.no_invitation} Invitations`,
                  included: pkg.no_invitation !== 0,
                },
                { text: `${pkg.no_cvs} CVs`, included: pkg.no_cvs !== 0 },
                {
                  text: `${pkg.no_media} Media`,
                  included: pkg.no_media !== 0,
                },
                {
                  text: `${pkg.no_calls} Calls`,
                  included: pkg.no_calls !== 0,
                },
                { text: `${pkg.no_rfp} RFPs`, included: pkg.no_rfp !== 0 },
              ]}
              highlighted={pkg.title === 2}
              data-testid={`package-card-${pkg.id}`}
            />
          ))}
        </div>
        {packeges && (
          <div data-testid="see-all-packages-button">
            <Button
              variant="outlineMain"
              additionalClasses="mt-8 rounded-lg h-14 font-medium"
            >
              See All Packages
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
