import NoData from "@/components/molecules/NoDate/NoDate";
import RFQsCard from "@/components/molecules/RFQsCard/RFQsCard";
import { useLanguage } from "@/hooks/useLanguage";
import { RFQsType } from "@/types/RFQs";
import React from "react";

export default function RFQs({
  filteredRFQs,
  isLoading,
  isInvitation,
}: {
  filteredRFQs: RFQsType[];
  isLoading: boolean;
  isInvitation?: boolean;
}) {
  const lang = useLanguage();
  return (
    <div data-testid="rfq-grid">
      {filteredRFQs?.length > 0 ? (
        filteredRFQs?.map((rfq) => (
          <RFQsCard
            isInvitation={isInvitation}
            key={rfq.id}
            id={rfq.id}
            status={rfq.status || rfq.invitable?.status}
            createdAt={rfq.created_at}
            subject={isInvitation ? rfq?.invitable?.subject : rfq?.subject}
            service={
              isInvitation
                ? rfq?.invitable?.service[`name_${lang}`] ||
                  rfq?.invitable?.service.name_en
                : rfq?.service[`name_${lang}`] || rfq?.service.name_en
            }
            category={
              !isInvitation
                ? rfq?.service?.category[`name_${lang}`] ||
                  rfq?.service?.category.name_en
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
