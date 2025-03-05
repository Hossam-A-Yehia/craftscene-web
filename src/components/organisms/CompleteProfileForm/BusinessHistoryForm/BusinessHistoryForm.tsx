"use client";
import Button from "@/components/atoms/Button/Button";
import FormField from "@/components/molecules/FormField/FormField";
import MultiSelectInput from "@/components/molecules/MultiSelectInput/MultiSelectInput";
import RadioGroup from "@/components/molecules/RadioGroup/RadioGroup";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import {
  CONTRACTOR_CLASSIFICATIONS,
  NUMBER_OF_EMPLOYEES,
  PRICE_RANGE,
  SERVICE_PROVIDER_CONTRACTOR,
  SERVICE_PROVIDER_CRAFTSMEN,
  SERVICE_PROVIDER_FREELANCE,
  SUPPLIER,
  SUPPLIER_CLASSIFICATIONS,
  VOLUME_OF_WORK,
  YEARS_OF_EXPERIENCE,
} from "@/constants/constants";
import { useOptions } from "@/hooks/useOptions";
import { CompleteProfile } from "@/types/CompleteProfile";
import { User } from "@/types/User";
import { Form, FormikProps } from "formik";
import { t } from "i18next";
import React from "react";

const BusinessHistoryForm = ({
  profile,
  formikProps,
  setCurrentForm,
}: {
  profile: User;
  formikProps: FormikProps<CompleteProfile>;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { errors, touched, handleSubmit: formikSubmit } = formikProps;
  const user_type = profile?.user_type;
  const isSupplier = user_type === SUPPLIER;
  const isContractor = user_type === SERVICE_PROVIDER_CONTRACTOR;
  const isCraftsman = user_type === SERVICE_PROVIDER_CRAFTSMEN;
  const isFreelancer = user_type === SERVICE_PROVIDER_FREELANCE;

  const supplierClassificationsOptions = useOptions({
    options: SUPPLIER_CLASSIFICATIONS,
    labelKey: "label",
    valueKey: "id",
  });

  const contractorClassificationsOptions = useOptions({
    options: CONTRACTOR_CLASSIFICATIONS,
    labelKey: "label",
    valueKey: "id",
  });

  const priceRangeOptions = useOptions({
    options: PRICE_RANGE,
    labelKey: "label",
    valueKey: "id",
  });

  const volumeOfWorkOptions = useOptions({
    options: VOLUME_OF_WORK,
    labelKey: "label",
    valueKey: "id",
  });

  const numberOfEmployeesOptions = useOptions({
    options: NUMBER_OF_EMPLOYEES,
    labelKey: "label",
    valueKey: "id",
  });

  const yearsOfExperienceOptions = useOptions({
    options: YEARS_OF_EXPERIENCE,
    labelKey: "label",
    valueKey: "id",
  });

  return (
    <Form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        formikSubmit(e);
        setCurrentForm((prev) => prev + 1);
      }}
      data-testid="business-history-form"
    >
      <div className="px-32 max-lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(isSupplier || isContractor) && (
            <MultiSelectInput
              id="classifications"
              name="classifications"
              label={t(
                "business_profile_form.business_history_form.classifications"
              )}
              required
              targetID
              options={
                isSupplier
                  ? supplierClassificationsOptions
                  : contractorClassificationsOptions
              }
              placeholder={t(
                "business_profile_form.business_history_form.classifications_placeholder"
              )}
              touched={!!touched.classifications}
              error={errors.classifications as string}
            />
          )}
          <RadioGroup
            options={priceRangeOptions}
            label={t("business_profile_form.business_history_form.price_range")}
            name="price_range"
            selectedValue={1}
            error={errors.price_range as string}
          />
          <SelectInput
            dataTestid="volume_of_work"
            id="volume_of_work"
            name="volume_of_work"
            label={t(
              "business_profile_form.business_history_form.volume_of_work"
            )}
            options={volumeOfWorkOptions}
            placeholder={t(
              "business_profile_form.business_history_form.volume_of_work_placeholder"
            )}
            touched={touched.volume_of_work}
            error={errors.volume_of_work}
          />
          {!isFreelancer && !isCraftsman && (
            <SelectInput
              dataTestid="number_of_employees"
              id="number_of_employees"
              name="number_of_employees"
              label={t(
                "business_profile_form.business_history_form.number_of_employees"
              )}
              options={numberOfEmployeesOptions}
              placeholder={t(
                "business_profile_form.business_history_form.number_of_employees_placeholder"
              )}
              touched={touched.number_of_employees}
              error={errors.number_of_employees}
            />
          )}

          <SelectInput
            dataTestid="years_of_experience"
            id="years_of_experience"
            name="years_of_experience"
            label={t(
              "business_profile_form.business_history_form.years_of_experience"
            )}
            options={yearsOfExperienceOptions}
            placeholder={t(
              "business_profile_form.business_history_form.years_of_experience_placeholder"
            )}
            touched={touched.years_of_experience}
            error={errors.years_of_experience}
          />
          {!isSupplier && (
            <FormField
              id="accomplished_projects_count"
              label={t(
                "business_profile_form.business_history_form.completed_projects"
              )}
              type="number"
              name="accomplished_projects_count"
              placeholder={t(
                "business_profile_form.business_history_form.completed_projects"
              )}
              touched={touched.accomplished_projects_count}
              errors={errors.accomplished_projects_count}
            />
          )}
        </div>

        <div className="max-w-[575px] mx-auto mb-8"></div>
        <div className="max-w-[450px] mx-auto flex flex-col items-center gap-4 ">
          <Button type="submit" variant="main" dataTestid="next-form">
            {t("business_profile_form.shared.next")}
          </Button>{" "}
          <Button
            onClick={() => {
              setCurrentForm((prev) => prev - 1);
            }}
            variant="outlineMain"
          >
            {t("business_profile_form.shared.previous")}
          </Button>{" "}
        </div>
      </div>
    </Form>
  );
};

export default BusinessHistoryForm;
