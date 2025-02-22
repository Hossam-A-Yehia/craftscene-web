import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  business_name: Yup.string().required("Business name is required"),
  business_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  hotline: Yup.string(),
  country_id: Yup.string().required("Country is required"),
  city_id: Yup.string().required("City is required"),
  lat: Yup.string(),
  lang: Yup.string(),
  classifications: Yup.array(),
  price_range: Yup.number().min(1).required("Price range is required"),
  volume_of_work: Yup.number().min(0).required("Volume of work is required"),
  number_of_employees: Yup.number()
    .min(0)
    .required("Number of employees is required"),
  years_of_experience: Yup.number()
    .min(0)
    .required("Years of experience is required"),
  business_des: Yup.string(),
});
