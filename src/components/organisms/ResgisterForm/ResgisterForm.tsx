"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import FormField from "@/components/molecules/FormField/FormField";
import Button from "@/components/atoms/Button/Button";
import NavLink from "@/components/atoms/NavLink/NavLink";
import { useTranslation } from "react-i18next";
import Alert from "@/components/atoms/Alert/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./register.css";
import { handleError } from "@/utils/handleError";
import { useRegister } from "@/hooks/useAuth";
import { initialValues, validationSchema } from "./Resgistervalidation";
import { RegisterFormValues } from "@/types/Auth";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import {
  CLIENT,
  SERVICE_PROVIDER_CRAFTSMEN,
  USER_TYPE,
} from "@/constants/constants";
import { useCountryData } from "@/hooks/useCountryData";

const ResgisterForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const mutation = useRegister();
  const { mutate, isPending, error } = mutation;
  const [showPassword, setShowPassword] = useState(false);
  const { countryOptions, cityOptions } = useCountryData();

  const onSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const structureData = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: `${values.first_name} ${values.last_name}`,
        email: values.email ? values.email : undefined,
        phone: values.phone ? values.phone : undefined,
        password: values.password,
        user_type: values.user_type,
        referrer_code: values.referral_code
          ? Number(values.referral_code)
          : undefined,
        confirm_password: values.confirm_password,
        country_id: values.country_id,
        city_id: values.city_id,
      };

      mutate(structureData, {
        onSuccess: (data) => {
          router.push(`/verification`);
          localStorage.setItem("userData-craft", JSON.stringify(structureData));
          const token = data.payload.accessToken;
          Cookies.set("signUpToken", token);
        },
      });
    } catch (err) {
      actions.setSubmitting(false);
      handleError(err);
    }
  };

  return (
    <div className="w-full max-w-[36rem] p-8 space-y-6">
      <div>
        <h2 className="form-heading">{t("auth.register.title")}</h2>
        <p className="form-description">{t("auth.register.desc")}</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                required
                id="first_name"
                label={t("auth.register.first_name")}
                type="text"
                name="first_name"
                placeholder={t("auth.register.first_name")}
                touched={touched.first_name}
                errors={errors.first_name}
                onBlur={() => setFieldTouched("first_name", true)}
              />

              <FormField
                required
                id="last_name"
                label={t("auth.register.last_name")}
                type="text"
                name="last_name"
                placeholder={t("auth.register.last_name")}
                touched={touched.last_name}
                errors={errors.last_name}
                onBlur={() => setFieldTouched("last_name", true)}
              />
            </div>
            <SelectInput
              required
              id="user_type"
              name="user_type"
              label={t("auth.register.label_type")}
              options={USER_TYPE}
              placeholder={t("auth.register.type")}
              touched={touched.user_type}
              error={errors.user_type}
            />
            <FormField
              required={
                Number(values.user_type) !== SERVICE_PROVIDER_CRAFTSMEN &&
                Number(values.user_type) !== CLIENT
              }
              id="email"
              label={t("auth.register.email")}
              type="email"
              name="email"
              placeholder={t("auth.register.email")}
              touched={touched.email}
              errors={errors.email}
              onBlur={() => setFieldTouched("email", true)}
            />
            <FormField
              id="phone"
              label={t("auth.register.phone")}
              type="text"
              name="phone"
              placeholder={t("auth.register.phone")}
              touched={touched.phone}
              errors={errors.phone}
              onBlur={() => setFieldTouched("phone", true)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SelectInput
                required
                id="country_id"
                name="country_id"
                label={t("rfq.country")}
                options={countryOptions}
                placeholder={t("rfq.country_placeholder")}
                error={errors.country_id}
                touched={touched.country_id}
                onChange={(option: any) => {
                  setFieldValue("country_id", option.value);
                  setFieldValue("city_id", "");
                }}
                dataTestid="country"
              />
              <SelectInput
                required
                id="city_id"
                name="city_id"
                label={t("rfq.city")}
                options={cityOptions(values.country_id)}
                placeholder={t("rfq.city_placeholder")}
                error={errors.city_id}
                touched={touched.city_id}
                onChange={(option: any) => {
                  setFieldValue("city_id", option.value);
                }}
                dataTestid="city"
              />
            </div>

            <div className="form-field-wrapper">
              <FormField
                required
                id="password"
                label={t("auth.register.password")}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("auth.register.placeholder_password")}
                touched={touched.password}
                errors={errors.password}
                onBlur={() => setFieldTouched("password", true)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-password-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-field-wrapper">
              <FormField
                required
                id="confirm_password"
                label={t("auth.register.confirm_password")}
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                placeholder={t("auth.register.placeholder_password")}
                touched={touched.confirm_password}
                errors={errors.confirm_password}
                onBlur={() => setFieldTouched("confirm_password", true)}
              />
              <button
                data-testid="eye-button"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-password-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <FormField
              id="referral_code"
              label={t("auth.register.referral_code")}
              type="string"
              name="referral_code"
              placeholder={t("auth.register.placeholder_referral_code")}
              touched={touched.referral_code}
              errors={errors.referral_code}
              onBlur={() => setFieldTouched("referral_code", true)}
            />

            <Button
              disabled={
                values.first_name === "" ||
                values.last_name === "" ||
                values.user_type === "" ||
                values.city_id === "" ||
                values.password === "" ||
                values.confirm_password === "" ||
                (values.email === "" &&
                  Number(values.user_type) !== SERVICE_PROVIDER_CRAFTSMEN &&
                  Number(values.user_type) !== CLIENT)
              }
              type="submit"
              variant="main"
              loading={isPending}
            >
              {t("auth.register.title")}
            </Button>
            {error && <Alert type="error" message={handleError(error)} />}
            <div className="signup-link">
              {t("auth.register.signin")}
              <NavLink href="/login"> {t("auth.register.click_here")}</NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResgisterForm;
