import * as Yup from "yup";
import { t } from "i18next";

export const validationSchema = Yup.object().shape({
  branchName: Yup.string().required(t("add_address.validation.address_title")),
  phone: Yup.string()
    .matches(/^\+?[0-9]{8,15}$/, t("auth.register.invalid_phone"))
    .required(t("auth.register.invalid_phone")),
  city: Yup.string().required(t("add_address.validation.city")),
  country: Yup.string().required(t("add_address.validation.country")),
  email: Yup.string().test(
    "is-email",
    t("add_address.validation.email"),
    function (value) {
      if (!value) return false;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;
      if (/^\+?[1-9]\d{1,14}$/.test(value)) return true;
      return false;
    }
  ),
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
