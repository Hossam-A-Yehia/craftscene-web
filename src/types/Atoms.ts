import { StaticImageData } from "next/image";

export interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "outlinePrimary"
    | "main"
    | "outlineMain"
    | "edit"
    | "delete";
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  additionalClasses?: string;
  loading?: boolean;
  dataTestid?: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export interface InputProps {
  id: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  name: string;
  touched?: boolean | undefined;
  errors?: string | undefined;
  readOnly?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export interface TextAreaProps extends Omit<InputProps, "type" | "onChange"> {
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}
export interface TextAreaProps extends Omit<InputProps, "type" | "onChange"> {
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface LinkProps {
  children: React.ReactNode;
  href: string;
  classN?: string;
}

export interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  testId?: string;
  layout?: string;
  fill?: boolean;
}

export interface AlertProps {
  type: "success" | "warning" | "error" | "info";
  message: string;
}

export interface ContainerProps {
  children: React.ReactNode;
  additionalClasses?: string;
}
export interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

export interface PinCodeInputProps {
  onChange: (value: string) => void;
  errors?: string;
  touched?: boolean;
  name: string;
}

export type TextProps = {
  children: React.ReactNode;
  className?: string;
  testId?: string;
};
