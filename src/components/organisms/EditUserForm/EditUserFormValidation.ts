import * as Yup from "yup";
import { t } from "i18next";

export const validationSchema = Yup.object().shape({
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
    .email(t("edit_user.validation.invalid_email"))
    .required(t("edit_user.validation.email_required")),
  phone: Yup.string()
    .matches(
      /^(?:\+|00)\d{1,4}\d{11}$/,
      t("edit_user.validation.invalid_phone")
    )
    .required(t("edit_user.validation.phone_required")),
  city_id: Yup.string().required(t("edit_user.validation.city")),
  country_id: Yup.string().required(t("edit_user.validation.country")),
});
