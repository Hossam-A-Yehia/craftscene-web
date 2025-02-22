import React from "react";
import "./input.css";
import { InputProps } from "@/types/Atoms";

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
  name,
  touched,
  errors,
  readOnly,
  onClick,
  disabled,
}) => (
  <input
    disabled={disabled}
    name={name}
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    required={required}
    onClick={onClick}
    data-testid={id}
    className={`input ${errors && touched ? "input-error" : "input-default"}`}
  />
);

export default Input;
