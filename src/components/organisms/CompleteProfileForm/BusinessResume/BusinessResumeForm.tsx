import Button from "@/components/atoms/Button/Button";
import SelectInput from "@/components/molecules/SelectInput/SelectInput";
import TextAreaField from "@/components/molecules/TextAreaField/TextAreaField";
import { file_types } from "@/constants/constants";
import { useFileUploader } from "@/hooks/useFileUploader";
import { CompleteProfile } from "@/types/CompleteProfile";
import { User } from "@/types/User";
import { FieldArray, Form, FormikProps } from "formik";
import { t } from "i18next";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const BusinessResumeForm = ({
  formikProps,
  setCurrentForm,
}: {
  profile: User;
  formikProps: FormikProps<CompleteProfile>;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    handleSubmit: formikSubmit,
  } = formikProps;

  const handleAttachments = (files: { file: File; type: null }[]) => {
    setFieldValue("files", [...(values.files || []), ...files]);
  };

  return (
    <Form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        formikSubmit(e);
        if (isValid) {
          setCurrentForm((prev) => prev + 1);
        }
      }}
    >
      <div className="px-32 max-lg:px-4">
        <div className="flex flex-col gap-4 mb-8">
          <TextAreaField
            id="business_desc_en"
            label={t(
              "business_profile_form.business_resume_form.business_desc_label_en"
            )}
            name="business_desc_en"
            placeholder={t(
              "business_profile_form.business_resume_form.business_desc_placeholder_en"
            )}
            touched={touched.business_desc_en}
            errors={errors.business_desc_en}
            required
          />
          <TextAreaField
            id="business_desc_ar"
            label={t(
              "business_profile_form.business_resume_form.business_desc_label_ar"
            )}
            name="business_desc_ar"
            placeholder={t(
              "business_profile_form.business_resume_form.business_desc_placeholder_ar"
            )}
            touched={touched.business_desc_ar}
            errors={errors.business_desc_ar}
            required
          />
          <div className="flex flex-col gap-1">
            <h2
              className="text-base font-normal"
              data-testid="upload-docs-title"
            >
              {t(
                "business_profile_form.business_resume_form.upload_docs_title"
              )}
            </h2>
            <h4 className="text-sm font-normal text-[#797979]">
              {" "}
              {t(
                "business_profile_form.business_resume_form.upload_docs_subtitle"
              )}
            </h4>
          </div>
          <div className="w-full mx-auto flex flex-col items-center gap-4">
            <FilesUploaderButton handleAttachments={handleAttachments} />
            <FieldArray
              name="files"
              render={({ remove }) => (
                <Attachment attachments={values.files || []} remove={remove} />
              )}
            />
          </div>
        </div>
        <div className="max-w-[450px] mx-auto flex flex-col items-center gap-4 ">
          <Button type="submit" variant="main" disabled={!isValid}>
            {t("business_profile_form.shared.next")}
          </Button>{" "}
          <Button
            onClick={() => {
              setCurrentForm((prev) => prev - 1);
            }}
            variant="outlineMain"
          >
            {t("business_profile_form.shared.previous")}
          </Button>{" "}
        </div>
      </div>
    </Form>
  );
};

export default BusinessResumeForm;

function FilesUploaderButton({
  handleAttachments,
}: {
  handleAttachments: (files: { file: File; type: null }[]) => void;
}) {
  const { getInputProps, getRootProps } = useFileUploader({
    onChange: (files: File[]) => {
      handleAttachments(
        files.map((file) => {
          return { file, type: null };
        })
      );
    },
    multiple: true,
    maxSize: 2 * 1024 * 1024,
    accept: {
      documents: ["application/pdf", "application/msword", "text/plain"],
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        type="button"
        variant="outlineMain"
        icon={<FaPlus />}
        dataTestid="files-uploader-button"
      >
        {t("business_profile_form.business_resume_form.upload_files_button")}
      </Button>
    </div>
  );
}

function Attachment({
  attachments,
  remove,
}: {
  attachments: { file: File; type: number | null }[];
  remove: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {attachments.length > 0 && (
        <>
          {attachments.map(({ file }, index) => (
            <div
              key={index}
              className="flex justify-between items-start p-6 border-[1px] border-[#CED4DA] rounded-md"
            >
              <div className="flex gap-4 max-lg:flex-col">
                <div className="flex gap-4 ">
                  <div className="flex justify-center items-center p-4 bg-[#5BBB7B0D] rounded-md ">
                    <FaFileAlt className="text-main" width={30} height={30} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-semibold text-[#071437]">
                      {file.name.toUpperCase()}
                    </h2>
                    <p className="text-sm font-normal text-[#797979]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <SelectInput
                  name={`files.${index}.type`}
                  options={file_types}
                  id={`files.${index}.type`}
                  label=""
                  placeholder={"Select file type"}
                  additionalClasses="!mb-0"
                  required
                />{" "}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-danger hover:text-red-600"
              >
                <IoMdClose />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
