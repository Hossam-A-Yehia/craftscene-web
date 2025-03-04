import { t } from "i18next";
import * as Yup from "yup";
export const BusinessHistoryValidation = Yup.object().shape({
  classifications: Yup.array()
    .of(Yup.number())
    .min(1, "Please select at least one classification")
    .optional(),
  price_range: Yup.number().optional(),
  volume_of_work: Yup.number().optional(),
  number_of_employees: Yup.number().optional().nullable(),
  years_of_experience: Yup.number().optional(),
  accomplished_projects_count: Yup.number()
    .min(0, t("Ensures the number is 0 or greater"))
    .optional()
    .nullable(),
});

export type BusinessHistoryFormValues = Yup.InferType<
  typeof BusinessHistoryValidation
>;
