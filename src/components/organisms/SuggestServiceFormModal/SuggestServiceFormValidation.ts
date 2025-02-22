import * as Yup from "yup";
export const SuggestServiceFormSchema = Yup.object().shape({
  name_ar: Yup.string().required("Business name is required"),
  name_en: Yup.string().required(),
  category_id: Yup.number().optional(),
});
