import Text from "@/components/atoms/Text/Text";
import { SharedTitleProps } from "@/types/Molecules";
import React from "react";

const SharedTitle: React.FC<SharedTitleProps> = ({ text, className }) => {
  return (
    <div
      className={`text-center py-4 relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:bg-main before:h-[2px] before:w-full w-fit mx-auto mb-5 ${className}`}
      data-testid="shared-title"
    >
      <Text className="text-3xl font-medium" data-testid="title-text">
        {text}
      </Text>
    </div>
  );
};

export default SharedTitle;
