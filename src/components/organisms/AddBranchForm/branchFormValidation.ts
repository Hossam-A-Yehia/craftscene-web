import * as Yup from "yup";
import { t } from "i18next";

export const validationSchema = Yup.object().shape({
  branchName: Yup.string()
    .trim()
    .min(3, t("Branch name must be at least 3 characters long"))
    .required(t("add_address.validation.address_title")),
  phone: Yup.string()
    .matches(/^\+?[0-9]{8,15}$/, t("auth.register.invalid_phone"))
    .required(t("auth.register.invalid_phone")),
  city: Yup.string().required(t("add_address.validation.city")),
  country: Yup.string().required(t("add_address.validation.country")),
  postCode: Yup.string()
    .matches(/^\d+$/, "Postcode must contain only numbers")
    .min(2, "Postcode must be at least 2 digits long")
    .optional(),
  email: Yup.string()
    .email(t("edit_user.validation.invalid_email"))
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Invalid email format")
    .required(t("edit_user.validation.email_required")),
});

export interface BranchFormValues {
  branchName: string;
  phone: string;
  city: string;
  country: string;
  postCode: string;
  email: string;
  lat: number;
  lang: number;
}

export const initialValues: BranchFormValues = {
  branchName: "",
  phone: "",
  city: "",
  country: "",
  postCode: "",
  email: "",
  lang: 0,
  lat: 0,
};
