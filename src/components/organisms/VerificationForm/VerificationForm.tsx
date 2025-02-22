"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import Button from "@/components/atoms/Button/Button";
import Alert from "@/components/atoms/Alert/Alert";
import { handleError } from "@/utils/handleError";
import { useResendCode, useVerificationEmail } from "@/hooks/useAuth";
import { initialValues, validationSchema } from "./VerificationFormValidation";
import { VerificationRequest } from "@/types/Auth";
import { t } from "i18next";
import PinCodeInput from "@/components/atoms/PinInput/PinCodeInput";
import "./verification.css";
import Text from "@/components/atoms/Text/Text";
import VerifyModal from "../Modals/VerifyModal/VerifyModal";
import { toast } from "react-toastify";
import { CLIENT } from "@/constants/constants";

const VerificationForm: React.FC = () => {
  const { mutate, isPending, error } = useVerificationEmail();
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<{
    email?: string;
    phone?: string;
    user_type?: string;
  }>({});
  const { email, phone, user_type } = userData;

  const { mutateAsync, isPending: isResendPending } = useResendCode();

  const [target, setTarget] = useState<"email" | "phone">("email");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData-craft");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        if (parsedData.email) {
          setTarget("email");
        } else if (parsedData.phone) {
          setTarget("phone");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const onSubmit = async (
    values: VerificationRequest,
    actions: FormikHelpers<VerificationRequest>
  ) => {
    const structuredUser =
      target === "email"
        ? { email, code: values.code }
        : { phone, code: values.code };
    mutate(structuredUser, {
      onSuccess: () => {
        actions.setSubmitting(false);
        setSuccessMessage(t("auth.varify.success_message"));
        localStorage.removeItem("userData-craft");
        setTimeout(() => {
          router.push(
            Number(user_type) !== CLIENT ? "/complete-profile" : "/login"
          );
        }, 2000);
      },
      onError: (err) => {
        actions.setSubmitting(false);
        handleError(err);
      },
    });
  };

  const toggleVerifyModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleResendCode = (target: "email" | "phone") => {
    const structuredUser = target === "email" ? { email } : { phone };
    mutateAsync(structuredUser)
      .then(() => {
        setTarget(target);
        setIsModalOpen(false);
        setTimeLeft(60);
        toast.info(t("auth.varify.code_resent_again"));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full max-w-[36rem] p-8 space-y-6">
      <div>
        <Text className="form-heading">{t("auth.varify.title")}</Text>
        <Text className="text-slate-400 text-center">
          {t("auth.varify.desc")}
        </Text>
        <Text className="text-center mt-1">
          {target === "email" ? "Email: " + email : "Phone: " + phone || ""}
        </Text>
      </div>
      {successMessage && <Alert type="success" message={successMessage} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-4">
            <div className="mb-8">
              <PinCodeInput
                onChange={(value) => setFieldValue("code", value)}
                errors={errors.code}
                touched={touched.code}
                name="code"
              />
            </div>
            {phone && email && (
              <>
                {timeLeft > 0 ? (
                  <div className="text-center text-gray-500">
                    {t("Wait")} {timeLeft}s {t("to send the code again")}
                  </div>
                ) : (
                  <div className="flex gap-[100px] items-center pt-2 pb-4">
                    <Button
                      type="button"
                      variant="outlineMain"
                      loading={isResendPending}
                      onClick={() => handleResendCode("email")}
                      dataTestid="verifyEmail"
                    >
                      {t("auth.varify.verify_by_email")}
                    </Button>
                    <Button
                      type="button"
                      variant="outlineMain"
                      loading={isResendPending}
                      onClick={() => handleResendCode("phone")}
                      dataTestid="verify-by-phone"
                    >
                      {t("auth.varify.verify_by_phone")}
                    </Button>
                  </div>
                )}
              </>
            )}

            <Button
              type="submit"
              variant="main"
              loading={isPending}
              disabled={values.code.length < 4}
              dataTestid="verify"
            >
              {t("auth.varify.verify_btn")}
            </Button>
            {error && <Alert type="error" message={handleError(error)} />}
          </Form>
        )}
      </Formik>
      <div className="signup-link ">
        {t("auth.varify.Didn't_receive_a_code")}
        <button
          data-testid="send-again"
          onClick={toggleVerifyModal}
          className="text-main font-semibold mx-1"
        >
          {t("auth.varify.send_again")}
        </button>
      </div>
      <VerifyModal
        isResendPending={isResendPending}
        target={target === "email" ? email : phone}
        isOpen={isModalOpen}
        onCancel={toggleVerifyModal}
        onUpdate={(newValue: any) =>
          setUserData((prev) => ({
            ...prev,
            [target === "email" ? "email" : "phone"]: newValue,
          }))
        }
        onConfirm={() => {
          handleResendCode(target);
          toggleVerifyModal();
        }}
      />
    </div>
  );
};

export default VerificationForm;
