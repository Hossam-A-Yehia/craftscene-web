import * as Yup from "yup";
export const ServicesValidationSchema = Yup.object().shape({
  services: Yup.array().of(
    Yup.object().shape({
      services: Yup.array()
        .of(
          Yup.object().shape({
            value: Yup.number().required(),
            label: Yup.string().required(),
          })
        )
        .min(1, "Please select at least one service"),
    })
  ),
});

export const initialValues = {
  services: [],
};
