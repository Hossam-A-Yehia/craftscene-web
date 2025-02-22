import { useState } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";

interface FilePreview extends Partial<File> {
  preview?: string;
}

enum ErrorCode {
  FILE_TOO_LARGE = "file-too-large",
  FILE_INVALID_TYPE = "file-invalid-type",
  TOO_MANY_FILES = "too-many-files",
  FILE_TOO_SMALL = "file-too-small",
}

const errorMessages = {
  [ErrorCode.FILE_TOO_LARGE]: (file: File, maxSize?: number) =>
    `الملف ${file.name} اكبر من ${maxSize ?? "غير معروف"} ميجا بايت`,
  [ErrorCode.FILE_INVALID_TYPE]: (file: File) =>
    `نوع الملف ${file.name} غير مدعوم`,
  [ErrorCode.TOO_MANY_FILES]: (maxFiles?: number) =>
    `يمكنك رفع ${maxFiles ?? "غير معروف"} ملفات فقط`,
  [ErrorCode.FILE_TOO_SMALL]: (file: File, minSize?: number) =>
    `الملف ${file.name} اصغر من ${minSize ?? "غير معروف"} ميجا بايت`,
};

type Args = DropzoneOptions & {
  onChange?: (items: File[]) => void;
  defaultValue?: File | File[] | null;
};

function transformDefaultValue(
  defaultValue?: File | File[] | null
): FilePreview[] {
  if (!defaultValue) return [];
  const files = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  return files.map((file) => ({
    type: file.type,
    name: file.name,
    preview: file.type.includes("image/")
      ? URL.createObjectURL(file)
      : undefined,
  }));
}

export function useFileUploader({ onChange, defaultValue, ...rest }: Args) {
  const [fileList, setFileList] = useState<FilePreview[]>(() =>
    transformDefaultValue(defaultValue)
  );

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      rejectedFiles.forEach((rejectedFile) => {
        const { file, errors } = rejectedFile;
        const error = errors[0];
        const errorMessage = (() => {
          switch (error.code as ErrorCode) {
            case ErrorCode.FILE_TOO_LARGE:
              return errorMessages[ErrorCode.FILE_TOO_LARGE](
                file,
                rest.maxSize
              );
            case ErrorCode.FILE_TOO_SMALL:
              return errorMessages[ErrorCode.FILE_TOO_SMALL](
                file,
                rest.minSize
              );
            case ErrorCode.TOO_MANY_FILES:
              return errorMessages[ErrorCode.TOO_MANY_FILES](rest.maxFiles);
            case ErrorCode.FILE_INVALID_TYPE:
            default:
              return errorMessages[ErrorCode.FILE_INVALID_TYPE](file);
          }
        })();

        alert(errorMessage);
      });
    }
    if (onChange) {
      onChange(acceptedFiles);
    }

    const files: FilePreview[] = [];

    acceptedFiles.forEach((file) => {
      files.push({
        ...file,
        preview: file.type.includes("image/")
          ? URL.createObjectURL(file)
          : undefined,
      });
    });
    setFileList((prev) =>
      rest.multiple ? [...prev, ...files] : files.slice(-1)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...rest,
  });

  return {
    getRootProps,
    getInputProps,
    fileList,
  };
}
