import { LabelProps } from "@/types/Atoms";
import React from "react";

const Label: React.FC<LabelProps> = ({ htmlFor, children, required }) => (
  <label
    className={`text-sm font-semibold mb-2 ${
      required ? `after:content-['*'] after:text-red-500` : ""
    }`}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

export default Label;
