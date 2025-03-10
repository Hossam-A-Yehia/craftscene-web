import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import FormField from "@/components/molecules/FormField/FormField";
import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import { validationSchema } from "./EditUserFormValidation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleError } from "@/utils/handleError";
import { useRouter } from "next/navigation";
import { useMutateEditUser } from "@/hooks/useUser";
import Loader from "@/components/atoms/Loader/Loader";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import { useCountryData } from "@/hooks/useCountryData";
import { useUser } from "@/context/UserContext";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_id: string;
  city_id: string;
}

const EditUserForm = ({ userId }: { userId: string }) => {
  const { countryOptions, cityOptions, isCountriesLoading } = useCountryData();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userData, isLoading: isUserLoading, isError } = useUser();

  const { mutateAsync, isPending, error, isSuccess } = useMutateEditUser();
  const [initialValues, setInitialValues] = useState<FormValues>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country_id: "",
    city_id: "",
  });

  useEffect(() => {
    if (userData) {
      setInitialValues({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country_id: userData.country_id || "",
        city_id: userData.city_id || "",
      });
    }
  }, [userData]);

  const onSubmit = async (values: FormValues) => {
    const structuredData: Record<string, any> = { user_id: userId };
    Object.keys(values).forEach((key) => {
      if (
        values[key as keyof FormValues] !==
        initialValues[key as keyof FormValues]
      ) {
        structuredData[key] = values[key as keyof FormValues];
      }
    });
    try {
      await mutateAsync(structuredData);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(t("Updated Successfully!"));
      router.refresh();
    } catch (err: any) {
      toast.error(handleError(err));
    }
  };

  if (isUserLoading || isCountriesLoading) return <Loader />;
  if (isError)
    return <Alert type="error" message={t("User data not found.")} />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, dirty, setFieldTouched }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <FormField
                id="first_name"
                label={t("edit_user.first_name")}
                type="text"
                name="first_name"
                placeholder={t("edit_user.first_name")}
                touched={touched.first_name}
                errors={errors.first_name}
                value={values.first_name}
                dataTestid="edit-first_name"
                onBlur={() => setFieldTouched("first_name", true)}
                required
              />
              <SelectInput
                id="country_id"
                name="country_id"
                label={t("Select Country")}
                options={countryOptions}
                placeholder={t("Select country")}
                error={errors.country_id}
                touched={touched.country_id}
                dataTestid="edit-country"
                required
              />

              <FormField
                id="email"
                label={t("edit_user.email")}
                type="email"
                name="email"
                placeholder={t("edit_user.email")}
                touched={touched.email}
                errors={errors.email}
                value={values.email}
                disabled
                dataTestid="edit-email"
                onBlur={() => setFieldTouched("email", true)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                id="last_name"
                label={t("edit_user.last_name")}
                type="text"
                name="last_name"
                placeholder={t("edit_user.last_name")}
                touched={touched.last_name}
                errors={errors.last_name}
                value={values.last_name}
                dataTestid="edit-last_name"
                onBlur={() => setFieldTouched("last_name", true)}
                required
              />
              <SelectInput
                id="city_id"
                name="city_id"
                label={t("Select City")}
                options={cityOptions(values.country_id)}
                placeholder={t("Select city")}
                error={errors.city_id}
                touched={touched.city_id}
                dataTestid="edit-city"
                required
              />
              <FormField
                id="phone"
                label={t("edit_user.phone")}
                type="text"
                name="phone"
                placeholder={t("edit_user.phone")}
                touched={touched.phone}
                errors={errors.phone}
                value={values.phone}
                disabled
                dataTestid="edit-phone"
                onBlur={() => setFieldTouched("phone", true)}
              />
            </div>
          </div>
          <div className="mt-4 text-center w-fit mx-auto">
            <Button
              type="submit"
              variant="main"
              loading={isPending}
              disabled={!dirty}
              dataTestid="edit user"
            >
              {t("edit_user.edit_user_btn")}
            </Button>
          </div>
          {error && <Alert type="error" message={handleError(error)} />}
          {isSuccess && <Alert type="success" message={t("success_message")} />}
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
