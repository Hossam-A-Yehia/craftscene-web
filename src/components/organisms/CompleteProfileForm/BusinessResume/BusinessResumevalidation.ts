import * as Yup from "yup";
export const BusinessResumeValidation = Yup.object().shape({
  business_desc_en: Yup.string()
    .trim()
    .min(10, "Business description must be at least 10 characters long")
    .required("Business description is required"),
  business_desc_ar: Yup.string()
    .trim()
    .min(10, "Business description must be at least 10 characters long")
    .optional(),
  files: Yup.array()
    .of(
      Yup.object().shape({
        file: Yup.mixed().required(),
        type: Yup.number().required().nonNullable(),
      })
    )
    .min(1, "Please select at least one file")
    .required(),
});
