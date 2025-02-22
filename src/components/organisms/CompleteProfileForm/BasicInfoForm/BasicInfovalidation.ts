import * as Yup from "yup";
import { t } from "i18next";
export const BasicInfoValidationSchema = Yup.object().shape({
  business_name: Yup.string().required("Business name is required"),
  business_email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{4,11}$/,
      t("auth.register.invalid_phone")
    )
    .required(),
  lang: Yup.number().required(),
  lat: Yup.number().required(),
  country_id: Yup.number().optional(),
  city_id: Yup.number().required(),
  hotline: Yup.string().optional(),
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
