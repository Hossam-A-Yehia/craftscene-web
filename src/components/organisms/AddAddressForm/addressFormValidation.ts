import * as Yup from "yup";
import { t } from "i18next";

export const validationSchema = Yup.object().shape({
  addressTitle: Yup.string().required(
    t("add_address.validation.address_title")
  ),
  phone: Yup.string().matches(
    /^\+?[1-9]\d{1,14}$/,
    t("add_address.validation.phone")
  ),
  city: Yup.string().required(t("add_address.validation.city")),
  country: Yup.string().required(t("add_address.validation.country")),
  postCode: Yup.string(),
  specialInstructions: Yup.string(),
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

export interface AddressFormValues {
  addressTitle: string;
  streetAddress: string;
  phone: string;
  city: string;
  country: string;
  postCode: string;
  specialInstructions: string;
  email: string;
  lat: number;
  lang: number;
}

export const initialValues: AddressFormValues = {
  addressTitle: "",
  streetAddress: "",
  phone: "",
  city: "",
  country: "",
  postCode: "",
  specialInstructions: "",
  email: "",
  lat: 0,
  lang: 0,
};
