import { t } from "i18next";
import React, { useState } from "react";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(
    t("order.checkout.cash")
  );

  const paymentMethods = [
    { id: 1, label: t("order.checkout.cash"), disabled: true },
    { id: 2, label: t("order.checkout.visa") },
  ];

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8">
      <div
        className="text-lg font-medium text-black"
        data-testid="payment-title"
      >
        {t("order.checkout.payment_method")}
      </div>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            data-testid={`payment-option-${method.id}`}
            data-selected={selectedMethod === method.label}
            data-disabled={method.disabled}
            onClick={() => setSelectedMethod(method.label)}
            key={method.id}
            className={`flex items-center select-none p-3 border rounded-lg ${
              method.disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } ${
              selectedMethod === method.label
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <div className="mr-3" data-testid={`payment-icon-${method.id}`}>
              {selectedMethod === method.label ? (
                <BsCheckCircleFill className="text-orange-500" size={20} />
              ) : (
                <BsCircle className="text-gray-400" size={20} />
              )}
            </div>
            <div className="text-gray-900">{method.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
