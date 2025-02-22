import * as Yup from "yup";
export const BusinessResumeValidation = Yup.object().shape({
  business_desc_en: Yup.string().required("Business description is required"),
  business_desc_ar: Yup.string().required("Business description is required"),
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
