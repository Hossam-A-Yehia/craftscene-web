import { SupplierSectionProps } from "@/types/Orders";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import CartItem from "../CartItem/CartItem";
import { t } from "i18next";
export const SupplierSection = ({
  items,
  isCheckout,
}: SupplierSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-semibold text-gray-900"
            data-testid="supplier-name"
          >
            {items[0]?.variant?.product?.user?.username}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500" data-testid="products-length">
            ({items.length}{" "}
            {items.length === 1
              ? t("order.cart.product")
              : t("order.cart.products")}
            )
          </span>
          <div data-testid="chevron-icon">
            <FiChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem key={item.id} item={item} isCheckout={isCheckout} />
          ))}
        </div>
      )}
    </div>
  );
};
