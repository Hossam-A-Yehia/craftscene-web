import * as Yup from "yup";
import { t } from "i18next";
import { CLIENT, SERVICE_PROVIDER_CRAFTSMEN } from "@/constants/constants";

export const validationSchema = Yup.object()
  .shape({
    first_name: Yup.string()
      .trim()
      .min(3, t("auth.register.first_name_min_length"))
      .matches(/^[A-Za-z\s]+$/, t("Allows only letters and spaces"))
      .required(t("edit_user.validation.first_name_is_required")),

    last_name: Yup.string()
      .trim()
      .min(3, t("auth.register.last_name_min_length"))
      .matches(/^[A-Za-z\s]+$/, t("Allows only letters and spaces"))
      .required(t("edit_user.validation.last_name_is_required")),
    email: Yup.string()
      .email(t("auth.register.invalid_email"))
      .when("user_type", {
        is: (user_type: string) =>
          user_type !== String(CLIENT) &&
          user_type !== String(SERVICE_PROVIDER_CRAFTSMEN),
        then: (schema) => schema.required(t("auth.register.email_required")),
      }),

    phone: Yup.string()
      .matches(/^\+?[0-9]{8,15}$/, t("auth.register.invalid_phone"))
      .nullable(),

    user_type: Yup.string().required(t("auth.register.user_type_is_required")),

    password: Yup.string()
      .required(t("auth.login.password_is_required"))
      .test(
        "strong-password",
        t("auth.register.password_requirements"),
        (value) =>
          !!value &&
          value.length >= 6 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /[0-9]/.test(value) &&
          /[!@#$%^&*(),.?":{}|<>]/.test(value)
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.register.passwords_must_match"))
      .required(t("auth.register.password_is_required")),

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
