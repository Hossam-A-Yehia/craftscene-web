"use client";

import React from "react";
import Container from "@/components/atoms/Container/Container";
import { Formik } from "formik";
import Loader from "@/components/atoms/Loader/Loader";
import { useUser } from "@/context/UserContext";
import PackagesForm from "@/components/organisms/CompleteProfileForm/PackagesForm/PackagesForm";
import { PackagesValidation } from "./Packagesvalidation";
import { useMutateChoosePackages } from "@/hooks/usePackages";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

type PackagesTemplateProps = {
  userId: string;
};

interface InitialValues {
  package_id: number;
  source: string;
}

const PackagesTemplate: React.FC<PackagesTemplateProps> = () => {
  const { userData: user, isLoading } = useUser();
  const { mutate: choosePackage, isPending: isSubmitting } =
    useMutateChoosePackages();

  if (isLoading || !user) return <Loader />;

  const initialValues: InitialValues = {
    package_id: 0,
    source: "website",
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Choose Your Plan
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Select the package that best fits your needs. Each plan includes a
              suite of features to help you succeed.
            </p>
          </div>

          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={PackagesValidation}
              onSubmit={(values) => {
                choosePackage(values, {
                  onSuccess: (res) => {
                    toast.success("Subscription successful!");
                    const paymentLink = res?.payload?.payment_link;
                    if (paymentLink) {
                      window.location.replace(paymentLink);
                      Cookies.remove("signUpToken");
                    } else {
                      toast.error("Payment link not found.");
                    }
                  },
                  onError: (error) => {
                    toast.error(error?.message);
                  },
                });
              }}
            >
              {(formikProps) => (
                <PackagesForm
                  isLoading={isSubmitting}
                  formikProps={formikProps}
                />
              )}
            </Formik>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Need help choosing?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PackagesTemplate;
