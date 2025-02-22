import Stepper from "@/components/molecules/Stepper/Stepper";
import GroupForm from "@/components/organisms/CompleteProfileForm/GroupForm";
import CompleteProfileEnum from "@/constants/enums/completeProfileEnum";
import { t } from "i18next";
import React, { useState } from "react";

const TOTAL_STEPS = 5;
const CompleteProfileLayout = () => {
  const [currentForm, setCurrentForm] = useState<number>(
    CompleteProfileEnum.BUSINESS_INFO
  );
  return (
    <div className="py-12 ">
      <PageTitle />
      <div className="my-8">
        <Stepper currentStep={currentForm} totalSteps={TOTAL_STEPS} />
      </div>
      <GroupForm currentForm={currentForm} setCurrentForm={setCurrentForm} />
    </div>
  );
};

export default CompleteProfileLayout;

const PageTitle = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold  text-[#0A144A] mb-2">
        {t("business_profile_form.header_title")}
      </h1>
      <p className="text-sm  text-[#0A144A]">
        {t("business_profile_form.header_desc")}{" "}
      </p>
    </div>
  );
};
