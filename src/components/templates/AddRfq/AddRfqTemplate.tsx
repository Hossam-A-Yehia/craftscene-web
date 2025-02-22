"use client";
import React, { useState } from "react";
import Container from "@/components/atoms/Container/Container";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateAddRFP } from "@/hooks/useRfqs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { initialValues, validationSchema } from "./AddRfqValidation";
import { RfpForm } from "@/components/organisms/RFQs/RfpForm/RfpForm";
import UsersList from "@/components/organisms/RFQs/UsersList/UsersList";

interface FormValues {
  subject: string;
  description: string;
  service_id: { value: string };
  city_id: string;
  files: { file: File }[];
}

interface IdState {
  ids: string[];
}

const AddRfqTemplate: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [ids, setIds] = useState<IdState>({ ids: [] });
  const [city, setCity] = useState<number | undefined>();
  const [service, setService] = useState<number | undefined>();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending: isMutatePutLoading } = useMutateAddRFP();

  interface StructuredUser {
    subject: string;
    description: string;
    service_id: string;
    notifiable_users: string[];
    city_id: string;
    files: any;
  }

  const handleSubmit = async (values: FormValues) => {
    const structuredUser: StructuredUser = {
      subject: values?.subject || "",
      description: values?.description || "",
      service_id: values?.service_id?.value || "",
      notifiable_users: ids.ids || [],
      city_id: values?.city_id || "",
      files: values.files,
    };

    const form_data = new FormData();
    for (const key in structuredUser) {
      if (structuredUser[key as keyof StructuredUser]) {
        if (key === "notifiable_users") {
          structuredUser.notifiable_users.forEach((notifiable_user, index) => {
            form_data.append(`notifiable_users[${index}]`, notifiable_user);
          });
        } else if (key === "files") {
          structuredUser.files.forEach((file: File, index: number) => {
            if (file instanceof File) {
              form_data.append(`files[${index}]`, file);
            }
          });
        } else {
          form_data.append(
            key,
            structuredUser[key as keyof StructuredUser] as string
          );
        }
      }
    }

    try {
      await mutateAsync(form_data as any);
      queryClient.invalidateQueries({ queryKey: ["businessUsers"] });
      router.push("/");
      toast.success(t("rfq.success_message"));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("error_occurred"));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      <Container>
        <div className="w-full p-8 space-y-6">
          <div className="mb-2 text-center">
            {step === 1 && (
              <Text className="text-2xl font-semibold">
                {t("rfq.form_title")}
              </Text>
            )}
            {step === 2 && (
              <Text className="text-2xl font-semibold">
                {t("rfq.services_providers_title")}
              </Text>
            )}
          </div>
          <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(form) => (
              <>
                {step === 1 ? (
                  <RfpForm
                    setCity={setCity}
                    setService={setService}
                    form={form}
                    setStep={setStep}
                  />
                ) : (
                  <UsersList
                    city={city}
                    service={service}
                    setIds={setIds}
                    setStep={setStep}
                    isMutatePutLoading={isMutatePutLoading}
                  />
                )}
              </>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default AddRfqTemplate;
