import React, { FC } from "react";
import { QuotationsType } from "@/types/RFQs";
import QuotationsCard from "@/components/molecules/QuotationsCard/QuotationsCard";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import { RFQStatus } from "@/constants/enums/rfqsEnum";

interface RFQDetailsProps {
  quotations: QuotationsType[];
}

const QuotationsGrid: FC<RFQDetailsProps> = ({ quotations }) => {
  const rfqStatus = quotations[0]?.discussionable?.status;

  return (
    <div className="space-y-6">
      {rfqStatus === RFQStatus.ACCEPTED && (
        <Text
          testId="massege"
          className="font-semibold text-green-700 text-md mx-auto text-center"
        >
          {t("rfq_details.accepted_quotation_message")}
        </Text>
      )}
      {quotations.map((quotation) => {
        return <QuotationsCard quotation={quotation} key={quotation.id} />;
      })}
    </div>
  );
};

export default QuotationsGrid;
