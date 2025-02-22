import Button from "@/components/atoms/Button/Button";
import Modal, { ModalBody, ModalHeader } from "@/components/atoms/Modal/Modal";
import FormField from "@/components/molecules/FormField/FormField";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import { useFetchCategories } from "@/hooks/useCategories";
import { useOptions } from "@/hooks/useOptions";
import { Category } from "@/types/Categories";
import { CompleteProfile } from "@/types/CompleteProfile";
import { extractLeafChildren } from "@/utils/getNestedChildren";
import { Form, Formik, FormikProps } from "formik";
import { SuggestServiceFormSchema } from "./SuggestServiceFormValidation";
import { t } from "i18next";
import { UserCategoryTypeEnum } from "@/constants/enums/userCategoryType";

const SuggestServiceFormModal = ({
  isOpen,
  onClose,
  formikProps: parentFormikProps,
  userCategoryType,
}: {
  isOpen: boolean;
  onClose: () => void;
  formikProps: FormikProps<CompleteProfile>;
  userCategoryType: number;
}) => {
  const { data: categories, isLoading: categoriesIsLoading } =
    useFetchCategories({
      category_type: userCategoryType,
    });

  const categoriesChildren = extractLeafChildren(categories?.data.payload);
  const categoryOptions = useOptions<Category>({
    options: categoriesChildren.filter((cat: any) =>
      parentFormikProps.values.categories
        .map(({ value }) => value)
        .includes(cat.id)
    ),
    labelKey: "name_en",
    valueKey: "id",
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        {userCategoryType === UserCategoryTypeEnum.SUPPLIER
          ? t("business_profile_form.service_form.suggest_product")
          : t("business_profile_form.service_form.suggest_service")}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={
            parentFormikProps.values.suggestService || {
              name_en: "",
              name_ar: "",
              category_id: null,
            }
          }
          validationSchema={SuggestServiceFormSchema}
          onSubmit={(value) => {
            parentFormikProps.setFieldValue("suggestService", {
              ...value,
              service_type:
                userCategoryType === UserCategoryTypeEnum.SUPPLIER ? 2 : 1,
            });
            onClose();
          }}
        >
          {({ ...formikProps }) => (
            <Form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                formikProps.submitForm();
              }}
            >
              <div className="">
                <div className="flex flex-col gap-4 mb-8">
                  <FormField
                    id="name_en"
                    label={
                      userCategoryType === UserCategoryTypeEnum.SUPPLIER
                        ? t(
                            "business_profile_form.service_form.product_group_name_en"
                          )
                        : t(
                            "business_profile_form.service_form.service_name_en"
                          )
                    }
                    type="text"
                    name="name_en"
                    placeholder={
                      userCategoryType === UserCategoryTypeEnum.SUPPLIER
                        ? t(
                            "business_profile_form.service_form.product_group_name_en_placeholder"
                          )
                        : t(
                            "business_profile_form.service_form.service_name_en_placeholder"
                          )
                    }
                    touched={formikProps.touched.name_en}
                    errors={formikProps.errors.name_en}
                    required
                  />
                  <FormField
                    id="name_ar"
                    label={
                      userCategoryType === UserCategoryTypeEnum.SUPPLIER
                        ? t(
                            "business_profile_form.service_form.product_group_ar"
                          )
                        : t(
                            "business_profile_form.service_form.service_name_ar"
                          )
                    }
                    type="text"
                    name="name_ar"
                    placeholder={
                      userCategoryType === UserCategoryTypeEnum.SUPPLIER
                        ? t(
                            "business_profile_form.service_form.product_group_name_ar_placeholder"
                          )
                        : t(
                            "business_profile_form.service_form.service_name_ar_placeholder"
                          )
                    }
                    touched={formikProps.touched.name_ar}
                    errors={formikProps.errors.name_ar}
                    required
                  />
                  <SelectInput
                    id="category_id"
                    name="category_id"
                    label={t(
                      "business_profile_form.service_form.select_business_category"
                    )}
                    required
                    options={categoryOptions}
                    loading={categoriesIsLoading}
                    placeholder={t(
                      "business_profile_form.service_form.select_business_category_placeholder"
                    )}
                    touched={formikProps.touched.category_id}
                    error={formikProps.errors.category_id}
                  />
                </div>
                <div className="max-w-[450px] mx-auto flex flex-col items-center gap-4 ">
                  <Button type="submit" variant="main">
                    {t("business_profile_form.service_form.submit_for_review")}
                  </Button>{" "}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default SuggestServiceFormModal;
