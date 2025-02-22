"use client";
import { Form, Formik } from "formik";
import React from "react";
import { t } from "i18next";
import FormField from "@/components/molecules/FormField/FormField";
import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import {
  AddressFormValues,
  initialValues,
  validationSchema,
} from "./addressFormValidation";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateAddAddress } from "@/hooks/useAddress";
import { toast } from "react-toastify";
import { handleError } from "@/utils/handleError";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import { useCountryData } from "@/hooks/useCountryData";
import { useDisclosure } from "@/hooks/useDisclosure";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/atoms/Modal/Modal";
import MapComponent from "@/components/molecules/Map/Map";

interface AddAddressFormProps {
  userId: string;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ userId }) => {
  const mapModal = useDisclosure();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutateAddAddress();
  const { countryOptions, cityOptions } = useCountryData();

  const onSubmit = (values: AddressFormValues) => {
    const structuredData = {
      title: values.addressTitle,
      street_address: values.streetAddress,
      special_instructions: values.specialInstructions,
      post_code: values.postCode,
      city_id: values.city,
      user_id: userId,
      email: values.email,
      phone: values.phone,
      lat: values.lat,
      lang: values.lang,
    };

    mutateAsync(structuredData)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["Address"] });
        toast.info(t("Address Added Successfully!"));
        router.push(`/address/${userId}`);
      })
      .catch((err) => {
        toast.error(t(err.response.data.message));
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col gap-3">
              <SelectInput
                id="country"
                name="country"
                label={t("add_address.country")}
                options={countryOptions}
                placeholder={t("add_address.country_placeholder")}
                error={errors.country}
                touched={touched.country}
                dataTestid="edit-country"
              />
              <FormField
                id="addressTitle"
                label={t("add_address.address_title")}
                type="text"
                name="addressTitle"
                placeholder={t("add_address.address_title_placeholder")}
                touched={touched.addressTitle}
                errors={errors.addressTitle}
              />
              <FormField
                id="phone"
                label={t("add_address.phone")}
                type="text"
                name="phone"
                placeholder={t("add_address.phone_placeholder")}
                touched={touched.phone}
                errors={errors.phone}
              />
              <FormField
                id="specialInstructions"
                label={t("add_address.special_instructions")}
                type="text"
                name="specialInstructions"
                placeholder={t("add_address.special_instructions_placeholder")}
                touched={touched.specialInstructions}
                errors={errors.specialInstructions}
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
            <div className="col-span-1 flex flex-col gap-3">
              <SelectInput
                id="city"
                name="city"
                label={t("add_address.city")}
                options={cityOptions(values.country)}
                placeholder={t("add_address.city_placeholder")}
                error={errors.city}
                touched={touched.city}
              />
              <FormField
                id="streetAddress"
                label={t("add_address.street_address")}
                type="text"
                name="streetAddress"
                placeholder={t("add_address.street_address_placeholder")}
                touched={touched.streetAddress}
                errors={errors.streetAddress}
              />
              <FormField
                id="email"
                label={t("add_address.email")}
                type="email"
                name="email"
                placeholder={t("add_address.email_placeholder")}
                touched={touched.email}
                errors={errors.email}
              />
              <FormField
                id="postCode"
                label={t("add_address.post_code")}
                type="text"
                name="postCode"
                placeholder={t("add_address.post_code_placeholder")}
                touched={touched.postCode}
                errors={errors.postCode}
              />
            </div>
          </div>
          {error && <Alert type="error" message={handleError(error)} />}
          <div className="w-fit mt-3 mx-auto">
            <Button
              dataTestid="submit-button"
              type="submit"
              variant="main"
              loading={isPending}
            >
              {t("add_address.add_addres_btn")}
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

export default AddAddressForm;
