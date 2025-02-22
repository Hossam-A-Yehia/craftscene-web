import * as Yup from "yup";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { t } from "i18next";
import BaseException from "@/exceptions/BaseException";
import { EXCEPTIONS } from "@/constants/constants";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useLoginwithGoogle } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .required(t("auth.login.email_or_phone_required"))
    .test(
      "is-email-or-phone",
      t("auth.login.invalid_email_or_phone"),
      function (value) {
        if (!value) return false;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;
        if (/^\+\d{1,4}\d{10,14}$/.test(value)) return true;
        return false;
      }
    ),
  password: Yup.string()
    .required(t("auth.login.password_is_required"))
    .min(6, t("auth.login.password_min_length")),
});

export const handleLoginSubmit =
  (mutate: ReturnType<typeof useLogin>["mutate"]) =>
  async (
    router: ReturnType<typeof useRouter>,
    values: { emailOrPhone: string; password: string },
    handleResendCode: (structuredUser: {
      email?: string;
      phone?: string;
    }) => void
  ) => {
    const targetKey = /^\+?\d{10,14}$/.test(values.emailOrPhone)
      ? "phone"
      : "email";

    try {
      await mutate(
        {
          password: values.password,
          [targetKey]: values.emailOrPhone,
        },
        {
          onSuccess: (data) => {
            const token = data.token;
            Cookies.set("authToken", token, { expires: 7, secure: true });
            window.location.replace("/");
          },
          onError: (err) => {
            if (err instanceof BaseException) {
              if (err.status === EXCEPTIONS.CONFLICT) {
                const structuredUser = { [targetKey]: values.emailOrPhone };
                handleResendCode(structuredUser);
                localStorage.setItem(
                  "userData-craft",
                  JSON.stringify(structuredUser)
                );
                setTimeout(() => {
                  router.push(`/verification`);
                }, 2000);
              }
              if (err.token) {
                Cookies.set("signUpToken", err.token, { secure: true });
                setTimeout(() => {
                  router.push("/complete-profile");
                }, 2000);
              }
            } else {
              console.error("Unexpected error:", err);
            }
          },
        }
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

export const handleGoogleLogin = async (
  mutateLoginWithGoogle: ReturnType<typeof useLoginwithGoogle>["mutate"],
  router: ReturnType<typeof useRouter>,
  t: ReturnType<typeof useTranslation>["t"]
) => {
  try {
    const result = await signIn("google", { redirect: false });
    if (result?.error) {
      toast.error(t("auth.login.login_with_google.google_login_failed"));
      return;
    }
    const session = await getSession();
    const email = session?.user?.email;

    if (!email) {
      toast.error(t("auth.login.login_with_google.email_not_found"));
      return;
    }

    mutateLoginWithGoogle(email, {
      onSuccess: (data) => {
        const accessToken = data.payload.accessToken;
        Cookies.set("authToken", accessToken, { expires: 7, secure: true });
        router.push("/");
      },
      onError: (err) => {
        toast.error(
          err?.message ||
            t("auth.login.login_with_google.an_error_occurred_during_login")
        );
      },
    });
  } catch (error: any) {
    toast.error(
      error || t("auth.login.login_with_google.an_error_occurred_during_login")
    );
  }
};
