import * as Yup from "yup";

export const validationSchema = Yup.object({
  code: Yup.string().required("Code is required"),
});

export const initialValues = {
  code: "",
};
