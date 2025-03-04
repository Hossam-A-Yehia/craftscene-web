"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import FormField from "@/components/molecules/FormField/FormField";
import {
  validationSchema,
  handleLoginSubmit,
  handleGoogleLogin,
} from "@/components/organisms/LoginForm/Loginvalidation";
import Button from "@/components/atoms/Button/Button";
import SocialButton from "@/components/atoms/SocialButton/SocialButton";
import NavLink from "@/components/atoms/NavLink/NavLink";
import { useTranslation } from "react-i18next";
import Alert from "@/components/atoms/Alert/Alert";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./loginForm.css";
import { handleError } from "@/utils/handleError";
import { useLogin, useLoginwithGoogle, useResendCode } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const mutation = useLogin();
  const { mutate, isPending, error } = mutation;
  const { mutate: mutateLoginWithGoogle, isPending: isPendingLoginWithGoogle } =
    useLoginwithGoogle();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync } = useResendCode();

  const handleResendCode = (structuredUser: {
    email?: string;
    phone?: string;
  }) => {
    mutateAsync(structuredUser)
      .then(() => {
        toast.info(t("auth.varify.code_resent_again"));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onSubmit = async (
    values: { emailOrPhone: string; password: string },
    actions: FormikHelpers<{ emailOrPhone: string; password: string }>
  ) => {
    await handleLoginSubmit(mutate)(router, values, handleResendCode);
    actions.setSubmitting(false);
  };

  return (
    <div className="w-full max-w-[32rem] p-8 space-y-6">
      <div>
        <h2 className="form-heading">{t("auth.login.title")}</h2>
        <p className="form-description">{t("auth.login.desc")}</p>
      </div>
      <Formik
        initialValues={{ emailOrPhone: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ errors, touched, setFieldTouched }) => (
          <Form className="space-y-4">
            <FormField
              id="emailOrPhone"
              label={t("auth.login.email_or_phone")}
              type="text"
              name="emailOrPhone"
              placeholder={t("auth.login.placeholder_email_or_phone")}
              touched={touched.emailOrPhone}
              errors={errors.emailOrPhone}
              onBlur={() => setFieldTouched("emailOrPhone", true)}
            />
            <div className="form-field-wrapper">
              <FormField
                id="password"
                label={t("auth.login.password")}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("auth.login.placeholder_password")}
                touched={touched.password}
                errors={errors.password}
                onBlur={() => setFieldTouched("password", true)}
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
            <div className="forgot-password-link">
              <NavLink href="/forget-password">
                {t("auth.login.forget_password")}
              </NavLink>
            </div>
            <Button type="submit" variant="main" loading={isPending}>
              {t("auth.login.login")}
            </Button>
            {error && <Alert type="error" message={handleError(error)} />}
            <div className="signup-link ">
              {t("auth.login.signup")}
              <NavLink href="/register"> {t("auth.login.click_here")}</NavLink>
            </div>
            <div className="or-divider">OR</div>
          </Form>
        )}
      </Formik>
      <div className="social-button-wrapper">
        <SocialButton
          icon={<FcGoogle />}
          label={t("auth.login.google_login")}
          additionalClasses="social-button"
          onClick={() => handleGoogleLogin(mutateLoginWithGoogle, router, t)}
          children={undefined}
          isDisabled={isPendingLoginWithGoogle}
        />
      </div>
    </div>
  );
};

export default LoginForm;
