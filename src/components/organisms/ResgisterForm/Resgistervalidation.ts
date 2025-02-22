import * as Yup from "yup";
import { t } from "i18next";
import { CLIENT, SERVICE_PROVIDER_CRAFTSMEN } from "@/constants/constants";

export const validationSchema = Yup.object()
  .shape({
    first_name: Yup.string()
      .trim()
      .min(2, t("auth.register.first_name_min_length"))
      .required(t("auth.register.first_name_is_required")),

    last_name: Yup.string()
      .trim()
      .min(2, t("auth.register.last_name_min_length"))
      .required(t("auth.register.last_name_is_required")),

    email: Yup.string()
      .email(t("auth.register.invalid_email"))
      .when("user_type", {
        is: (user_type: string) =>
          user_type !== String(CLIENT) &&
          user_type !== String(SERVICE_PROVIDER_CRAFTSMEN),
        then: (schema) => schema.required(t("auth.register.email_required")),
      }),

    phone: Yup.string()
      .matches(/^(?:\+|00)\d{1,4}\d{11}$/, t("auth.register.invalid_phone"))
      .nullable(),

    user_type: Yup.string().required(t("auth.register.user_type_is_required")),

    password: Yup.string()
      .required(t("auth.login.password_is_required"))
      .min(6, t("auth.login.password_min_length")),

    confirm_password: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        t("auth.reset_password.passwords_must_match")
      )
      .required(t("auth.reset_password.password_is_required")),

    referral_code: Yup.number()
      .typeError("Referral code must be a number")
      .notRequired(),

    city_id: Yup.string().required(t("auth.register.city_is_required")),
  })
  .test(
    "email-or-phone-required",
    t("auth.register.email_or_phone_required"),
    function (values) {
      const { user_type, email, phone } = values;

      if (
        [String(CLIENT), String(SERVICE_PROVIDER_CRAFTSMEN)].includes(user_type)
      ) {
        if (!email && !phone) {
          return this.createError({
            path: "email",
            message: t("auth.register.email_or_phone_required"),
          });
        }
      }

      return true;
    }
  );

export const initialValues = {
  username: "",
  email: "",
  phone: "",
  password: "",
  user_type: "",
  referral_code: "",
  last_name: "",
  confirm_password: "",
  first_name: "",
  city_id: "",
  country_id: "",
};
