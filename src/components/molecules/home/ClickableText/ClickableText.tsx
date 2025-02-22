import Text from "@/components/atoms/Text/Text";
import { ClickableTextProps } from "@/types/Molecules";
import React from "react";

const ClickableText: React.FC<ClickableTextProps> = ({
  text,
  onClick,
  isActive,
}) => {
  return (
    <span
      data-testid="clickable-text"
      onClick={onClick}
      className={`cursor-pointer hover:text-main text-[16px] ${
        isActive ? "text-main" : "text-[#898989]"
      }`}
    >
      <Text>{text}</Text>
    </span>
  );
};

export default ClickableText;
