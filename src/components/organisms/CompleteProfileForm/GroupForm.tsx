"use client";

import { useMemo } from "react";
import { Formik, FormikHelpers } from "formik";
import Loader from "@/components/atoms/Loader/Loader";
import CompleteProfileEnum from "@/constants/enums/completeProfileEnum";
import { useFetchUser } from "@/hooks/useUser";
import { initialValues } from "./initialValues";

// Forms
import BasicInfoForm from "./BasicInfoForm/BasicInfoForm";
import BusinessHistoryForm from "./BusinessHistoryForm/BusinessHistoryForm";
import BusinessResumeForm from "./BusinessResume/BusinessResumeForm";
import ServicesForm from "./ServicesForm/ServicesForm";

// Schemas
import { BasicInfoValidationSchema } from "./BasicInfoForm/BasicInfovalidation";
import { BusinessHistoryValidation } from "./BusinessHistoryForm/BusinessHistoryvalidation";
import { BusinessResumeValidation } from "./BusinessResume/BusinessResumevalidation";
import { ServicesValidationSchema } from "./ServicesForm/Servicesvalidation";

interface GroupFormProps {
  currentForm: CompleteProfileEnum;
  setCurrentForm: React.Dispatch<React.SetStateAction<CompleteProfileEnum>>;
}

const GroupForm: React.FC<GroupFormProps> = ({
  currentForm,
  setCurrentForm,
}) => {
  const { data: profile, isLoading } = useFetchUser();

  const SCHEMAS = useMemo(
    () => ({
      [CompleteProfileEnum.BUSINESS_INFO]: BasicInfoValidationSchema,
      [CompleteProfileEnum.SERVICES]: ServicesValidationSchema,
      [CompleteProfileEnum.BUSINESS_HISTORY]: BusinessHistoryValidation,
      [CompleteProfileEnum.RESUME]: BusinessResumeValidation,
    }),
    []
  );

  const FORM_COMPONENTS = useMemo(
    () => ({
      [CompleteProfileEnum.BUSINESS_INFO]: BasicInfoForm,
      [CompleteProfileEnum.SERVICES]: ServicesForm,
      [CompleteProfileEnum.BUSINESS_HISTORY]: BusinessHistoryForm,
      [CompleteProfileEnum.RESUME]: BusinessResumeForm,
    }),
    []
  );

  if (isLoading) return <Loader />;
  if (!profile) return <p>Error loading profile data.</p>;

  const ActiveFormComponent =
    FORM_COMPONENTS[currentForm] || (() => <p>Invalid form type selected.</p>);

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SCHEMAS[currentForm]}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {(formikProps) => (
        <ActiveFormComponent
          formikProps={formikProps}
          profile={profile}
          setCurrentForm={setCurrentForm}
        />
      )}
    </Formik>
  );
};

export default GroupForm;
