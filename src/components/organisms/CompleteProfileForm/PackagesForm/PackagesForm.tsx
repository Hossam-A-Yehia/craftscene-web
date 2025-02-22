import React, { useEffect } from "react";
import { Form, FormikProps } from "formik";
import Button from "@/components/atoms/Button/Button";
import PackagesGroupRadio from "@/components/molecules/PackagesGroupRadio/PackagesGroupRadio";
import { useBusinessProfileFlow } from "@/hooks/useCompleteProfile";
import { CompleteProfile } from "@/types/CompleteProfile";
import { User } from "@/types/User";
import { staticPackages } from "./utilty";

const PackagesForm = ({
  profile,
  formikProps,
  setCurrentForm,
}: {
  profile: User;
  formikProps: FormikProps<CompleteProfile>;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    values,
    isValid,
    setFieldValue,
    handleSubmit: formikSubmit,
  } = formikProps;

  const { mutateBusinessProfile, isLoading } = useBusinessProfileFlow({
    ...values,
    user_id: profile.id,
  });

  const handleSubmit = () => {
    mutateBusinessProfile();
  };

  useEffect(() => {
    if (staticPackages.length > 0) {
      setFieldValue("package_id", staticPackages[0].value);
    }
  }, [setFieldValue]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        formikSubmit();
        if (isValid) {
          handleSubmit();
        }
      }}
    >
      <div className="px-32 max-lg:px-4 mb-8">
        <PackagesGroupRadio
          options={staticPackages}
          required
          name="package_id"
        />
      </div>
      <div className="max-w-[450px] mx-auto flex flex-col items-center gap-4">
        <Button type="submit" variant="main" loading={isLoading}>
          Submit
        </Button>
        <Button
          onClick={() => {
            setCurrentForm((prev) => prev - 1);
          }}
          variant="outlineMain"
        >
          Previous
        </Button>
      </div>
    </Form>
  );
};

export default PackagesForm;
