import React from "react";
import Text from "@/components/atoms/Text/Text";
import { BusinessInfoType } from "@/types/User";
import { t } from "i18next";
import { findLabelById } from "@/utils/generalUtils";
import {
  NUMBER_OF_EMPLOYEES,
  SUPPLIER,
  YEARS_OF_EXPERIENCE,
  SERVICE_PROVIDER_FREELANCE,
  PRICE_RANGE,
  VOLUME_OF_WORK,
  CONTRACTOR_CLASSIFICATIONS,
  SERVICE_PROVIDER_CONTRACTOR,
  SUPPLIER_CLASSIFICATIONS,
} from "@/constants/constants";
import { GoProject } from "react-icons/go";
import { FaPhone, FaUsersLine } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { CgWorkAlt } from "react-icons/cg";

const InfoCard = ({
  icon: Icon,
  title,
  value,
  testId,
}: {
  icon: React.ElementType;
  title: string;
  value: string | React.ReactNode;
  testId: string;
}) => (
  <div
    className="bg-white flex items-center gap-5 my-2 p-2 rounded-lg"
    data-testid={testId}
  >
    <Icon className="text-2xl" />
    <div className="flex flex-col gap-1">
      <Text className="text-md font-semibold" testId={`card-title-${testId}`}>
        {title}
      </Text>
      <Text className="text-sm text-slate-800" testId={`${testId}-value`}>
        {value}
      </Text>
    </div>
  </div>
);

const Classifications = ({
  classifications,
  classificationType,
}: {
  classifications: { id: number; classification: string }[];
  classificationType: {
    label: string;
    id: number;
  }[];
}) => (
  <div
    className="bg-white flex items-center gap-5 my-2 p-2 rounded-lg"
    data-testid="classifications-section"
  >
    <div className="flex flex-col gap-1">
      <Text
        className="text-md font-semibold px-2 mb-2"
        testId="classifications-title"
      >
        {t("business_profile.classifications")}
      </Text>
      <div className="flex flex-wrap gap-2">
        {classifications.map((classification) => (
          <div
            data-testid={`classification-${classification.id}`}
            key={classification.id}
            className="px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-lg shadow-sm"
          >
            {findLabelById(classification.classification, classificationType)}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function About({
  businessInfo,
}: {
  businessInfo: BusinessInfoType;
}) {
  const {
    accomplished_projects_count,
    phone,
    business_email,
    years_of_experience,
    number_of_employees,
    price_range,
    volume_of_work,
    classifications,
    user,
  } = businessInfo;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-7">
      {accomplished_projects_count && user?.user_type !== SUPPLIER && (
        <InfoCard
          testId={"projects-card"}
          icon={GoProject}
          title={t("business_profile.complated_projects")}
          value={`${accomplished_projects_count} ${t(
            "business_profile.project"
          )}`}
        />
      )}

      {phone && (
        <InfoCard
          icon={FaPhone}
          title={t("business_profile.phone")}
          value={phone}
          testId={"phone-card"}
        />
      )}

      {business_email && (
        <InfoCard
          icon={MdEmail}
          title={t("business_profile.email")}
          value={business_email}
          testId={"email-card"}
        />
      )}

      {years_of_experience && (
        <InfoCard
          testId={"experience-card"}
          icon={GrUserExpert}
          title={t("business_profile.years_of_experience")}
          value={findLabelById(years_of_experience, YEARS_OF_EXPERIENCE)}
        />
      )}

      {number_of_employees &&
        user?.user_type !== SERVICE_PROVIDER_FREELANCE && (
          <InfoCard
            testId={"employees-card"}
            icon={FaUsersLine}
            title={t("business_profile.number_of_employees")}
            value={`${findLabelById(
              number_of_employees,
              NUMBER_OF_EMPLOYEES
            )} ${t("business_profile.employees")}`}
          />
        )}

      {price_range && (
        <InfoCard
          testId={"price-range-card"}
          icon={CiMoneyBill}
          title={t("business_profile.price_range")}
          value={findLabelById(+price_range, PRICE_RANGE)}
        />
      )}

      {volume_of_work && (
        <InfoCard
          testId={"volume-card"}
          icon={CgWorkAlt}
          title={t("business_profile.volume_of_work")}
          value={findLabelById(+volume_of_work, VOLUME_OF_WORK)}
        />
      )}

      {classifications.length > 0 &&
        user?.user_type === SERVICE_PROVIDER_CONTRACTOR && (
          <Classifications
            classifications={classifications}
            classificationType={CONTRACTOR_CLASSIFICATIONS}
          />
        )}

      {classifications.length > 0 && user?.user_type === SUPPLIER && (
        <Classifications
          classifications={classifications}
          classificationType={SUPPLIER_CLASSIFICATIONS}
        />
      )}
    </div>
  );
}
