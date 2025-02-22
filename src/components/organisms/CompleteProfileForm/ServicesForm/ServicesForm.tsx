"use client";
import Button from "@/components/atoms/Button/Button";
import Loader from "@/components/atoms/Loader/Loader";
import MultiSelectInput from "@/components/molecules/MultiSelectInput/MultiSelectInput";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useLanguage } from "@/hooks/useLanguage";
import { useOptions } from "@/hooks/useOptions";
import { useFetchServices } from "@/hooks/useServices";
import { CategoryService } from "@/types/Categories";
import { CompleteProfile } from "@/types/CompleteProfile";
import { OptionType } from "@/types/Molecules";
import { Form, FormikProps } from "formik";
import React, { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import SuggestServiceFormModal from "../../SuggestServiceFormModal/SuggestServiceFormModal";
import { User } from "@/types/User";
import { UserCategoryTypeEnum } from "@/constants/enums/userCategoryType";
import { UserTypeEnum } from "@/constants/enums/userTypeEnum";
import { t } from "i18next";

const extractServicesFields = (
  services: CategoryService[],
  categoriesIDS: number[],
  lang: string
): {
  category: { id: number; title: string };
  servicesOptions: OptionType[];
}[] => {
  if (
    !Array.isArray(services) ||
    services.length === 0 ||
    !Array.isArray(categoriesIDS)
  ) {
    return [];
  }

  const servicesIDs = new Set(services.map(({ category_id }) => category_id));

  return categoriesIDS
    .filter((categoryID) => servicesIDs.has(categoryID))
    .map((categoryID) => {
      const servicesArr = services.filter(
        ({ category_id }) => category_id === categoryID
      );

      const parentCategory = services.find(
        ({ category_id }) => category_id === categoryID
      ) as CategoryService;

      return {
        category: {
          id: categoryID,
          title:
            parentCategory?.category[`name_${lang}`] ||
            parentCategory?.category.name_en ||
            "Unknown Category",
        },
        servicesOptions: useOptions({
          options: servicesArr,
          labelKey: `name_${lang}`,
          valueKey: "id",
        }),
      };
    });
};

const ServicesForm = ({
  profile,
  formikProps,
  setCurrentForm,
}: {
  profile: User;
  formikProps: FormikProps<CompleteProfile>;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const lang = useLanguage();
  const {
    values,
    errors,
    touched,
    setFieldValue,
    isValid,
    handleSubmit: formikSubmit,
  } = formikProps;

  const userPreferredCategory =
    UserCategoryTypeEnum[
      UserTypeEnum[profile?.user_type] as keyof typeof UserCategoryTypeEnum
    ];

  const suggestServiceDisclosure = useDisclosure();

  const FormikCategoriesIDs = useMemo(
    () => values?.categories.map(({ value }) => +value),
    [values?.categories]
  );

  const { data: servicesData, isLoading: isLoadingServices } = useFetchServices(
    {
      paginate: false,
      type: userPreferredCategory === UserCategoryTypeEnum.SUPPLIER ? 2 : 1,
      categoryIds: FormikCategoriesIDs,
    }
  );

  const sortedFields = React.useMemo(
    () =>
      extractServicesFields(servicesData?.payload, FormikCategoriesIDs, lang),
    [servicesData, FormikCategoriesIDs, lang]
  );

  useEffect(() => {
    if (servicesData?.payload && Array.isArray(FormikCategoriesIDs)) {
      const servicesCategoriesIDs = new Set(
        servicesData.payload.map(
          ({ category_id }: CategoryService) => category_id
        )
      );
      const initialValues = FormikCategoriesIDs.filter((categoryID) =>
        servicesCategoriesIDs.has(categoryID)
      ).map((id) => ({ parentCategory: id, services: [] }));

      setFieldValue("services", initialValues);
    }
  }, [setFieldValue, FormikCategoriesIDs, servicesData]);

  if (isLoadingServices) return <Loader />;

  return (
    <>
      {" "}
      <Form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          formikSubmit();
          if (isValid) {
            setCurrentForm((prev) => prev + 1);
          }
        }}
      >
        <div className="px-32 max-lg:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sortedFields?.map((field: any, index: number) => (
              <MultiSelectInput
                key={index}
                id={`services[${index}].services`}
                name={`services[${index}].services`}
                label={field?.category?.title}
                options={field?.servicesOptions}
                placeholder={t(
                  "business_profile_form.service_form.choose_services_placeholder"
                )}
                loading={isLoadingServices}
                touched={!!touched?.services?.[index]?.services}
                error={
                  Array.isArray(errors?.services)
                    ? (errors.services[index] as { services: string })?.services
                    : undefined
                }
              />
            ))}

            <div>
              <h2 className="text-base font-normal mb-1">
                {t("business_profile_form.service_form.did_not_find_service")}
              </h2>
              <p
                className="text-sm font-normal text-[#797979] mb-2"
                data-testid="desc"
              >
                {t(
                  "business_profile_form.service_form.suggest_new_service_desc"
                )}
              </p>
              <Button
                dataTestid="suggest-service"
                type="button"
                variant="outlineMain"
                icon={<FaPlus />}
                onClick={suggestServiceDisclosure.onOpen}
              >
                {userPreferredCategory === UserCategoryTypeEnum.SUPPLIER
                  ? t("business_profile_form.service_form.suggest_product")
                  : t("business_profile_form.service_form.suggest_service")}
              </Button>
            </div>
          </div>

          <div className="max-w-[575px] mx-auto mb-8"></div>
          <div className="max-w-[450px] mx-auto flex flex-col items-center gap-4 ">
            <Button
              type="submit"
              variant="main"
              disabled={!isValid}
              dataTestid="next-form"
            >
              {t("business_profile_form.shared.next")}
            </Button>
            <Button
              onClick={() => {
                setCurrentForm((prev) => prev - 1);
              }}
              variant="outlineMain"
            >
              {t("business_profile_form.shared.previous")}
            </Button>
          </div>
        </div>
      </Form>
      {suggestServiceDisclosure.isOpen && (
        <SuggestServiceFormModal
          isOpen={suggestServiceDisclosure.isOpen}
          onClose={suggestServiceDisclosure.onClose}
          formikProps={formikProps}
          userCategoryType={userPreferredCategory}
        />
      )}
    </>
  );
};

export default ServicesForm;
