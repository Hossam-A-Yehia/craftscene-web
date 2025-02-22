import * as Yup from "yup";
export const BusinessHistoryValidation = Yup.object().shape({
  classifications: Yup.array()
    .of(Yup.number())
    .min(1, "Please select at least one classification")
    .optional(),
  price_range: Yup.number().required({
    message: "Price range is required",
  }),
  volume_of_work: Yup.number().required({
    message: "Volume of work is required",
  }),
  number_of_employees: Yup.number().optional().nullable(),
  years_of_experience: Yup.number().required({
    message: "Years of experience is required",
  }),
  accomplished_projects_count: Yup.number().optional().nullable(),
});

export type BusinessHistoryFormValues = Yup.InferType<
  typeof BusinessHistoryValidation
>;
