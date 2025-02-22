import * as Yup from "yup";

export const initialValues = {
  category_id: null,
  service_id: [],
};

export const validationSchema = Yup.object().shape({
  category_id: Yup.object()
    .nullable() // Allow null as the initial state
    .shape({
      label: Yup.string().required("Category label is required"),
      value: Yup.string().required("Category ID is required"),
    })
    .required("Category is required"),
  service_id: Yup.array()
    .min(1, "Please select at least one service")
    .required("Service is required"),
});
