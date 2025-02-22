import React from "react";
import clsx from "clsx";
import "./button.css";
import { ButtonProps } from "@/types/Atoms";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  variant = "primary",
  loading = false,
  children,
  type,
  additionalClasses = "",
  dataTestid,
  icon,
  iconPosition = "start",
}) => {
  const variantStyles = {
    main: "btn-main",
    primary: "btn-primary",
    secondary: "btn-secondary",
    outlinePrimary: "btn-outline-primary",
    outlineMain: "btn-outline-main",
    delete: "btn-delete",
    edit: "btn-edit",
  };

  const renderIcon = () => {
    if (!icon) return null;
    const iconClass =
      iconPosition === "start"
        ? "btn-icon btn-icon-start"
        : "btn-icon btn-icon-end";
    return <span className={iconClass}>{icon}</span>;
  };

  return (
    <button
      data-testid={dataTestid}
      type={type}
      onClick={onClick}
      className={clsx(additionalClasses, "btn", variantStyles[variant], {
        "btn-loading": loading,
      })}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {iconPosition === "start" && renderIcon()}
          {children}
          {iconPosition === "end" && renderIcon()}
        </>
      )}
    </button>
  );
};

export default Button;
