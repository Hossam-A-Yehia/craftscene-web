import { TextProps } from "@/types/Atoms";
import React from "react";

const Text: React.FC<TextProps> = ({ children, className, testId }) => {
  return (
    <p data-testid={testId} className={className}>
      {children}
    </p>
  );
};

export default Text;
