import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FormField from "../../FormField/FormField";
import { useMutateAddReply } from "@/hooks/useRfqs";
import { MAX_FILE_SIZE } from "@/constants/constants";
import FileUploadSection from "../../FileUpload/FileUploadSection";
import { validateFile } from "@/utils/validateFile";
import Text from "@/components/atoms/Text/Text";
import { useTranslation } from "react-i18next";

interface FileWithError {
  file: File;
  error?: string;
}

interface ModalContentProps {
  onCancel: () => void;
  invitableId: number;
}

const ReplyReceivedAskModalContent: React.FC<ModalContentProps> = ({
  onCancel,
  invitableId,
}) => {
  const { mutateAsync, isPending: isSubmitting } = useMutateAddReply();
  const [uploadedFiles, setUploadedFiles] = useState<FileWithError[]>([]);
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    details: Yup.string().required(t("received_ask.validation.details")),
    files: Yup.array()
      .of(
        Yup.mixed<File>()
          .nullable()
          .test("fileSize", t("received_ask.validation.size_file"), (file) =>
            file ? file.size <= MAX_FILE_SIZE : true
          )
      )
      .min(1, t("received_ask.validation.min"))
      .max(5, t("received_ask.validation.max")),
  });

  return (
    <div
      className="p-8 space-y-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto transition-transform transform hover:scale-105"
      data-testid="reply-invitation-modal-content"
    >
      <Formik
        initialValues={{ details: "", files: [] }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const formData = new FormData();
            formData.append("details", values.details);
            formData.append("discussionable_id", String(invitableId));
            formData.append("discussionable_type", "2");
            values.files.forEach((file) => formData.append("files", file));
            await mutateAsync(formData);
            toast.success(t("invitation_details.success_reply_message"));
            onCancel();
          } catch (err: any) {
            toast.error(
              err.message || t("An error occurred. Please try again.")
            );
          }
        }}
      >
        {({ touched, errors, values, setFieldValue }) => {
          const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const files = event.target.files;
            if (!files?.length) return;
            const newFiles: FileWithError[] = Array.from(files).map((file) => ({
              file,
              error: validateFile(file),
            }));
            setUploadedFiles((prev) => [...prev, ...newFiles]);
            const validFiles = [...uploadedFiles, ...newFiles]
              .filter((f) => !f.error)
              .map((f) => f.file);
            setFieldValue("files", validFiles);
            event.target.value = "";
          };
          const removeFile = (index: number) => {
            setUploadedFiles((prev) => {
              const newFiles = [...prev];
              newFiles.splice(index, 1);
              const validFiles = newFiles
                .filter((f) => !f.error)
                .map((f) => f.file);
              setFieldValue("files", validFiles);
              return newFiles;
            });
          };

          return (
            <Form>
              <div className="text-center mb-8">
                <Text className="text-2xl font-bold text-gray-800 mb-2">
                  {t("received_ask.add_reply")}
                </Text>
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  id="details"
                  label={t("received_ask.details")}
                  type="text"
                  name="details"
                  placeholder={t("received_ask.details_placeholder")}
                  touched={touched.details}
                  errors={errors.details}
                  value={values.details}
                  dataTestid="details-reply"
                />
              </div>
              <div className="mt-3">
                <FileUploadSection
                  uploadedFiles={uploadedFiles}
                  handleFileChange={handleFileChange}
                  removeFile={removeFile}
                />
              </div>
              <div className="flex justify-around space-x-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={onCancel}
                  dataTestid="cancel-button-reply"
                  type="button"
                >
                  {t("received_ask.cancel")}
                </Button>
                <Button
                  dataTestid="confirm-button-reply"
                  variant="main"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t("received_ask.sent_reply")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReplyReceivedAskModalContent;
