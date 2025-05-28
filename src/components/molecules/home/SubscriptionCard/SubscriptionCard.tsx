import CustomImage from "@/components/atoms/Image/CustomImage";
import Text from "@/components/atoms/Text/Text";
import React from "react";
import IMG1 from "@/assets/images/home/packegeMain.svg";
import IMG2 from "@/assets/images/home/packegewhite.svg";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SubscriptionProps } from "@/types/Molecules";

const SubscriptionCard: React.FC<SubscriptionProps> = ({
  title,
  price,
  description,
  features,
  highlighted,
}) => {
  return (
    <div
      data-testid="subscription-card"
      className={`p-6 border rounded-xl shadow-md h-fit ${
        highlighted
          ? "bg-main text-white"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <CustomImage
          src={highlighted ? IMG2 : IMG1}
          alt="package"
          width={0}
          height={0}
        />
        <Text className="text-xl font-bold">{title}</Text>
      </div>
      <Text
        className={`text-sm mb-6 ${
          highlighted ? "text-white" : "text-slate-600"
        }`}
      >
        {description}
      </Text>
      <Text className="text-3xl font-bold mb-6">
        {price === 0 ? "Free" : `$${price}`}{" "}
        <sub className="text-sm font-normal">
          {price === 0 ? "Forever free" : "Per Month"}
        </sub>
      </Text>
      <ul className="space-y-6 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <span
              className={`${
                feature.included ? "text-green-500" : "text-red-500"
              }`}
            >
              {feature.included ? (
                <FaCheck
                  className={highlighted ? "text-white" : "text-green-700"}
                />
              ) : (
                <IoMdClose
                  className={highlighted ? "text-white" : "text-red-500"}
                />
              )}
            </span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionCard;
