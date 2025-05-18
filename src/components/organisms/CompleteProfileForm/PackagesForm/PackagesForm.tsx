import React, { useEffect } from "react";
import { Form } from "formik";
import Button from "@/components/atoms/Button/Button";
import PackagesGroupRadio from "@/components/molecules/PackagesGroupRadio/PackagesGroupRadio";
import { useFetchPackages } from "@/hooks/usePackages";
import Loader from "@/components/atoms/Loader/Loader";

const PackagesForm = ({
  formikProps,
  isLoading
}: {
  formikProps:any;
  isLoading:boolean
}) => {
  const {
    setFieldValue,
  } = formikProps;


  const { data: packages, isLoading: isLoadingPackages } = useFetchPackages();

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
    >
      <div className=" mb-8">
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
      </div>
    </Form>
  );
};

export default PackagesForm;