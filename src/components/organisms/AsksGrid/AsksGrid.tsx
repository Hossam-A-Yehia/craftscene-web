import AsksCard from "@/components/molecules/AsksCard/AsksCard";
import NoData from "@/components/molecules/NoDate/NoDate";
import { useLanguage } from "@/hooks/useLanguage";
import { Ask } from "@/types/Ask";
import React from "react";

export default function AsksGrid({
  data,
  isLoading,
  isInvitation,
}: {
  data: Ask[];
  isLoading: boolean;
  isInvitation?: boolean;
}) {
  const lang = useLanguage();
  return (
    <div data-testid="asks-grid">
      {data?.length > 0 ? (
        data?.map((ask) => (
          <AsksCard
            isInvitation={isInvitation}
            key={ask.id}
            id={ask.id}
            createdAt={ask.created_at}
            title={!isInvitation ? ask.title : ask.invitable.title}
            username={isInvitation ? ask.invitable.user.username : ""}
            service={
              !isInvitation
                ? ask.service[`name_${lang}`] || ask.service.name_en
                : ask.invitable.service[`name_${lang}`] ||
                  ask.invitable.service.name_en
            }
            category={
              !isInvitation
                ? ask.service.category[`name_${lang}`] ||
                  ask.service.category.name_en
                : ""
            }
          />
        ))
      ) : (
        <>
          {!isLoading && (
            <div className="text-center pt-5" data-testid="no-data">
              <NoData />
            </div>
          )}
        </>
      )}
    </div>
  );
}
