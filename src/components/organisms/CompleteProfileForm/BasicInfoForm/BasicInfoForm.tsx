"use client";
import Button from "@/components/atoms/Button/Button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/atoms/Modal/Modal";
import FormField from "@/components/molecules/FormField/FormField";
import MapComponent from "@/components/molecules/Map/Map";
import MultiSelectInput from "@/components/molecules/MultiSelectInput/MultiSelectInput";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import { UserCategoryTypeEnum } from "@/constants/enums/userCategoryType";
import { UserTypeEnum } from "@/constants/enums/userTypeEnum";
import { useFetchCategories } from "@/hooks/useCategories";
import { useCheckPhoneEmailExistence } from "@/hooks/useCompleteProfile";
import { useCountry } from "@/hooks/useCountry";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useLanguage } from "@/hooks/useLanguage";
import { useOptions } from "@/hooks/useOptions";
import { Category } from "@/types/Categories";
import { CompleteProfile } from "@/types/CompleteProfile";
import { OptionType } from "@/types/Molecules";
import { Country, User } from "@/types/User";
import { extractLeafChildren } from "@/utils/getNestedChildren";
import { Form, FormikErrors, FormikProps } from "formik";
import { t } from "i18next";
import React, { useMemo } from "react";
import CoverUpload from "./CoverUpload";
import LogoUpload from "./LogoUpload";

const BasicInfoForm = ({
  profile,
  formikProps,
  setCurrentForm,
}: {
  profile: User;
  formikProps: FormikProps<CompleteProfile>;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    setFieldTouched,
    values,
    errors,
    touched,
    setErrors,
    isValid,
    setFieldValue,
    handleSubmit: formikSubmit,
  } = formikProps;

  const lang = useLanguage();

  const userPreferredCategory =
    UserCategoryTypeEnum[
      UserTypeEnum[profile?.user_type] as keyof typeof UserCategoryTypeEnum
    ];

  const mapModal = useDisclosure();

  const { mutate: validatePhoneEmail, isPending: checkPending } =
    useCheckPhoneEmailExistence();

  const { data: countries, isLoading: countriesLoading } = useCountry();

  const countryOptions = useOptions<Country>({
    options: countries?.data.payload as Country[],
    labelKey: "name_en",
    valueKey: "id",
  });

  const cityOptions = (() => {
    const selectedCountry = countries?.data.payload.find(
      (country) => country.id === values.country_id
    );
    if (selectedCountry) {
      return selectedCountry.cities?.map((city) => ({
        label: (city[`name_${lang}`] as string) || city.name_en,
        value: city.id,
      }));
    }
    return [];
  })();

  const { data: categories, isLoading: categoriesIsLoading } =
    useFetchCategories({
      category_type: userPreferredCategory,
    });

  const categoryTitle = categories?.data.payload[0].name_en;
  const categoriesChildren = extractLeafChildren(categories?.data.payload);
  const categoryOptions = useOptions<Category>({
    options: categoriesChildren,
    labelKey: "name_en",
    valueKey: "id",
  });

  const checkExist = (
    values: CompleteProfile,
    {
      setErrors,
    }: { setErrors: (errors: FormikErrors<CompleteProfile>) => void }
  ) => {
    validatePhoneEmail(
      { email: values.business_email, phone: values.phone, type: 1 },
      {
        onSuccess: ({ data }) => {
          if (data.email_exists || data.phone_exists) {
            setErrors({
              ...(data.email_exists && {
                business_email: t(
                  "business_profile_form.basic_form.Email_already_exists"
                ),
              }),
              ...(data.phone_exists && {
                phone: t(
                  "business_profile_form.basic_form.Phone_number_already_exists"
                ),
              }),
            });
            return;
          }
          setCurrentForm((prev) => prev + 1);
        },
      }
    );
  };
  const isFormValid = useMemo(
    () =>
      values.business_name &&
      values.business_email &&
      values.city_id &&
      values.phone &&
      values.lat &&
      values.categories.length > 0,
    [values]
  );
  return (
    <>
      <Form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          formikSubmit(e);
          if (isValid) {
            checkExist(values, { setErrors });
          }
        }}
      >
        <div className="px-16 max-lg:px-4">
          <CoverUpload
            name="profile"
            setFieldValue={setFieldValue}
            defaultValue={values.profile}
          />
          <LogoUpload
            name="logo"
            setFieldValue={setFieldValue}
            defaultValue={values.logo}
          />
        </div>
        <div className="px-32 max-lg:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 -mt-12">
            <FormField
              value={values.business_name}
              id="business_name"
              label={t("business_profile_form.basic_form.business_name")}
              type="text"
              name="business_name"
              placeholder={t("business_profile_form.basic_form.business_name")}
              touched={touched.business_name}
              errors={errors.business_name}
              required
              data-testid="business_name"
              onBlur={() => setFieldTouched("business_name", true)}
            />
            <FormField
              value={values.business_email}
              id="business_email"
              label={t("business_profile_form.basic_form.business_email")}
              type="text"
              name="business_email"
              placeholder={t("business_profile_form.basic_form.business_email")}
              touched={touched.business_email}
              errors={errors.business_email}
              required
              onBlur={() => setFieldTouched("business_email", true)}
            />
            <FormField
              value={values.phone}
              id="phone"
              label={t("business_profile_form.basic_form.business_phone")}
              type="string"
              name="phone"
              placeholder={t("business_profile_form.basic_form.business_phone")}
              touched={touched.phone}
              errors={errors.phone}
              required
              onBlur={() => setFieldTouched("phone", true)}
            />
            <FormField
              value={values.hotline}
              id="hotline"
              label={t("business_profile_form.basic_form.hotline")}
              type="string"
              name="hotline"
              placeholder={t("business_profile_form.basic_form.hotline")}
              touched={touched.hotline}
              errors={errors.hotline}
              onBlur={() => setFieldTouched("hotline", true)}
            />
            <SelectInput
              dataTestid="country_id"
              id="country_id"
              name="country_id"
              label={t("business_profile_form.basic_form.country")}
              required
              options={countryOptions}
              placeholder={t("business_profile_form.basic_form.country")}
              loading={countriesLoading}
              touched={touched.country_id}
              error={errors.country_id}
            />
            <SelectInput
              dataTestid="city_id"
              id="city_id"
              name="city_id"
              label={t("business_profile_form.basic_form.city")}
              required
              options={cityOptions}
              placeholder={t("business_profile_form.basic_form.city")}
              disabled={!values.country_id}
              touched={touched.city_id}
              error={errors.city_id}
            />
            <FormField
              id="location"
              label={t("business_profile_form.basic_form.location")}
              type="text"
              name="location"
              readOnly
              placeholder={
                values.lat && values.lang
                  ? `${values.lat.toFixed(5)}, ${values.lang.toFixed(5)}`
                  : t("business_profile_form.basic_form.location")
              }
              onClick={mapModal.onOpen}
              touched={touched.hotline}
              errors={errors.hotline}
              required
            />
          </div>
          <div className="text-center mt-7 mb-4">
            <h2 className="text-base font-bold mb-2">
              {t("business_profile_form.basic_form.choose_business_category")}
            </h2>
            <p className="text-xs text-[#797979]">
              {t("business_profile_form.basic_form.select_categories")}
            </p>
          </div>
          <div className="max-w-[575px] mx-auto mb-8">
            <MultiSelectInput
              id="categories"
              name="categories"
              label={
                categoryTitle || t("business_profile_form.basic_form.category")
              }
              required
              value={(values.categories as OptionType[]) || []}
              options={categoryOptions}
              placeholder={
                categoryTitle || t("business_profile_form.basic_form.category")
              }
              loading={categoriesIsLoading}
              touched={!!touched.categories}
              error={errors.categories as string}
            />
          </div>
          <div className="max-w-[450px] mx-auto flex flex-col items-center gap-4 ">
            <Button
              type="submit"
              variant="main"
              loading={checkPending}
              disabled={!isFormValid}
              dataTestid="next-step"
            >
              {t("business_profile_form.shared.next")}
            </Button>{" "}
          </div>
        </div>
      </Form>
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
    </>
  );
};

export default BasicInfoForm;
