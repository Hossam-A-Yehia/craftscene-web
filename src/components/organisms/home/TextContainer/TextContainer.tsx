import ClickableText from "@/components/molecules/home/ClickableText/ClickableText";
import React from "react";
import { t } from "i18next";

interface TextContainerProps {
  next: string;
  setNext: React.Dispatch<React.SetStateAction<string>>;
}

interface Option {
  label: string;
  value: string;
}

const TextContainer: React.FC<TextContainerProps> = ({ next, setNext }) => {
  const options: Option[] = [
    { label: "Ideas", value: t("home.features.ideas") },
    { label: "Products", value: t("home.features.products") },
    { label: "Professionals", value: t("home.features.professionals") },
    { label: "Suppliers", value: t("home.features.suppliers") },
  ];

  const handleTextClick = (text: string) => {
    setNext(text);
  };

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 pt-5 mb-10 flex-wrap">
      {options.map((option) => (
        <React.Fragment key={option.label}>
          {option.label !== options[0].label && <span>/</span>}
          <ClickableText
            text={option.value}
            onClick={() => handleTextClick(option.label)}
            isActive={next === option.label}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextContainer;
