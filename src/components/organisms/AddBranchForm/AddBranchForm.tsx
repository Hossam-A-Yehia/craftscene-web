import { Form, Formik } from "formik";
import React from "react";
import { t } from "i18next";
import FormField from "@/components/molecules/FormField/FormField";
import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import {
  BranchFormValues,
  initialValues,
  validationSchema,
} from "./branchFormValidation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutateAddBranch } from "@/hooks/useBranches";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import { useCountryData } from "@/hooks/useCountryData";
import { useDisclosure } from "@/hooks/useDisclosure";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/atoms/Modal/Modal";
import MapComponent from "@/components/molecules/Map/Map";

interface AddBranchFormProps {
  userId: string;
}

const AddBranchForm: React.FC<AddBranchFormProps> = ({ userId }) => {
  const mapModal = useDisclosure();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutateAddBranch();
  const { countryOptions, cityOptions } = useCountryData();

  const onSubmit = (values: BranchFormValues) => {
    const structuredData = {
      branch_name: values.branchName,
      city_id: values.city,
      user_id: userId,
      email: values.email,
      phone: values.phone,
      lat: values.lat,
      lang: values.lang,
    };

    mutateAsync(structuredData)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["Branches"] });
        toast.info(t("Branch Added Successfully!"));
        router.push(`/branches/${userId}`);
      })
      .catch(() => {
        toast.error(t("The email or phone has already been taken."));
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="space-y-6">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            data-testid="add-branch-form"
          >
            <div className="col-span-1 flex flex-col gap-3">
              <SelectInput
                id="country"
                name="country"
                label={t("add_branch.country")}
                options={countryOptions}
                placeholder={t("add_branch.country_placeholder")}
                error={errors.country}
                touched={touched.country}
                dataTestid="country-branch"
              />
              <FormField
                dataTestid="branch_name"
                id="branchName"
                label={t("add_branch.branch_name")}
                type="text"
                name="branchName"
                placeholder={t("add_branch.branch_name_placeholder")}
                touched={touched.branchName}
                errors={errors.branchName}
              />
              <FormField
                dataTestid="phone-branch"
                id="phone"
                label={t("add_branch.phone")}
                type="text"
                name="phone"
                placeholder={t("add_branch.phone_placeholder")}
                touched={touched.phone}
                errors={errors.phone}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-3">
              <SelectInput
                id="city"
                name="city"
                label={t("add_branch.city")}
                options={cityOptions(values.country)}
                placeholder={t("add_branch.city_placeholder")}
                error={errors.city}
                touched={touched.city}
                dataTestid="city-branch"
              />
              <FormField
                dataTestid="email-branch"
                id="email"
                label={t("add_branch.email")}
                type="email"
                name="email"
                placeholder={t("add_branch.email_placeholder")}
                touched={touched.email}
                errors={errors.email}
              />
              <FormField
                dataTestid="postCode-branch"
                id="postCode"
                label={t("add_branch.post_code")}
                type="text"
                name="postCode"
                placeholder={t("add_branch.post_code_placeholder")}
                touched={touched.postCode}
                errors={errors.postCode}
              />
              <FormField
                id="location"
                label={t("business_profile_form.basic_form.location")}
                type="text"
                name="location"
                readOnly
                placeholder={
                  values.lat && values.lang
                    ? `${Number(values.lat).toFixed(5)}, ${Number(
                        values.lang
                      ).toFixed(5)}`
                    : t("business_profile_form.basic_form.location")
                }
                onClick={mapModal.onOpen}
                touched={touched.lang}
                errors={errors.lang}
                required
              />
            </div>
          </div>
          {error && (
            <Alert
              type="error"
              message={"The email or phone has already been taken."}
            />
          )}
          <div className="w-fit mt-3 mx-auto">
            <Button
              dataTestid="submit-button"
              type="submit"
              variant="main"
              loading={isPending}
            >
              {t("add_branch.add_branch_btn")}
            </Button>
          </div>
          <Modal isOpen={mapModal.isOpen} onClose={mapModal.onClose}>
            <ModalHeader dataTestid="map-modal-title">
              {t("business_profile_form.basic_form.business_location")}
            </ModalHeader>
            <ModalBody className="w-[800px] max-w-full">
              <MapComponent
                setLatLng={(latLng) => {
                  setFieldValue("lat", latLng.lat);
                  setFieldValue("lang", latLng.lng);
                }}
                defaultLocation={
                  values.lat
                    ? {
                        lat: Number(values.lat),
                        lng: Number(values.lang),
                      }
                    : undefined
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="main"
                additionalClasses="!w-fit mx-auto"
                onClick={mapModal.onClose}
              >
                {t("business_profile_form.shared.save")}
              </Button>
            </ModalFooter>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddBranchForm;
