import React, { useEffect } from "react";
import { Form, FormikProps } from "formik";
import Button from "@/components/atoms/Button/Button";
import PackagesGroupRadio from "@/components/molecules/PackagesGroupRadio/PackagesGroupRadio";
import { useBusinessProfileFlow } from "@/hooks/useCompleteProfile";
import { CompleteProfile } from "@/types/CompleteProfile";
import { User } from "@/types/User";
import { useFetchPackages } from "@/hooks/usePackages";
import Loader from "@/components/atoms/Loader/Loader";

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

  const { data: packages, isLoading: isLoadingPackages } = useFetchPackages();

  const handleSubmit = () => {
    mutateBusinessProfile();
  };

  const transformedPackages = React.useMemo(() => {
    if (!packages || !Array.isArray(packages)) return [];
    
    return packages.map(pkg => ({
      value: pkg.id,
      label: pkg.name_en,
      price: pkg.price,
      description: pkg.desc_en,
      features: [
        { text: `${pkg.no_ideas === -1 ? "Unlimited" : pkg.no_ideas} Ideas`, enabled: true },
        { text: `${pkg.no_invitation === -1 ? "Unlimited" : pkg.no_invitation} Invitations`, enabled: true },
        { text: `${pkg.no_cvs === -1 ? "Unlimited" : pkg.no_cvs} CVs`, enabled: true },
        { text: `${pkg.no_media === -1 ? "Unlimited" : pkg.no_media} Media Uploads`, enabled: pkg.no_media > 0 },
        { text: `${pkg.no_calls === -1 ? "Unlimited" : pkg.no_calls} Calls`, enabled: true },
        { text: `${pkg.no_rfp === -1 ? "Unlimited" : pkg.no_rfp} RFPs`, enabled: true },
        { text: `${pkg.duration} Month${pkg.duration !== 1 ? 's' : ''} Duration`, enabled: pkg.duration > 0 },
      ],
    }));
  }, [packages]);

  useEffect(() => {
    if (transformedPackages.length > 0) {
      const freePackage = transformedPackages.find(pkg => pkg.price === 0);
      setFieldValue("package_id", freePackage ? freePackage.value : transformedPackages[0].value);
    }
  }, [transformedPackages, setFieldValue]);

  if (isLoadingPackages) {
    return <Loader/>;
  }

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
          options={transformedPackages}
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