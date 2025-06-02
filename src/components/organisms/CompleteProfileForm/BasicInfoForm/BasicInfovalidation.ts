import * as Yup from "yup";
import { t } from "i18next";
export const BasicInfoValidationSchema = Yup.object().shape({
  business_name: Yup.string()
    .trim()
    .min(3, "Business name must be at least 3 characters long")
    .matches(
      /^[A-Za-z\s]+$/,
      "Business name must contain only letters and spaces"
    )
    .required("Business name is required"),
  business_email: Yup.string()
    .email()
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Invalid email format")
    .required(),
  phone: Yup.string()
    .trim()
    .matches(/^\+[1-9][0-9]{7,14}$/, t("auth.register.invalid_phone"))
    .required(t("auth.register.phone_required")),

  lat: Yup.number().required(),
  country_id: Yup.number().optional(),
  city_id: Yup.number().required(),
  hotline: Yup.string()
    .matches(/^\d+$/, t("Allows only numbers (no letters, no special chars)"))
    .optional(),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number().required(),
        label: Yup.string().required(),
      })
    )
    .min(1, "Please select at least one category"),
  profile: Yup.mixed().optional().nullable(),
  logo: Yup.mixed().optional().nullable(),
});

export type BasicInfoFormValues = Yup.InferType<
  typeof BasicInfoValidationSchema
>;
