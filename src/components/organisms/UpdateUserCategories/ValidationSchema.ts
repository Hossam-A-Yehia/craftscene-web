import * as Yup from "yup";

export const initialValues = {
  category_id: "",
};

export const validationSchema = Yup.object().shape({
  category_id: Yup.array()
    .min(1, "Please select at least 1 category")
    .max(3, "Please select max 3 categories")
    .required("Category is required"),
});

export const CategoyTypesEnum: any = {
  SERVICE_PROVIDER_DESIGN_FREELANCE: 1,
  SERVICE_PROVIDER_DESIGN_FIRM: 2,
  SERVICE_PROVIDER_CONTRACTOR: 3,
  SERVICE_PROVIDER_CRAFTSMEN: 4,
  SUPPLIER: 5,
};
