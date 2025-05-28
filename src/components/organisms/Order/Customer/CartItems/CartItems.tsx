import { ResponseData } from "@/types/Orders";
import React, { useState } from "react";
import Loader from "@/components/atoms/Loader/Loader";
import NoData from "@/components/molecules/NoDate/NoDate";
import { FiChevronDown } from "react-icons/fi";
import { t } from "i18next";
import NavLink from "@/components/atoms/NavLink/NavLink";
import { useLanguage } from "@/hooks/useLanguage";

const CartItems = ({
  order,
  isLoading,
}: {
  order: ResponseData;
  isLoading: boolean;
}) => {
  const lang = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  const products = order?.products || [];

  if (isLoading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <NoData />;
  }

  const supplierId = order.supplier.id;

  return (
    <div className="space-y-6" data-testid="cart-items-container">
      {products?.map((product) => (
        <div
          className="border rounded-lg bg-white shadow-sm overflow-hidden"
          key={product.id}
          data-testid={`product-card-${product.id}`}
        >
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsExpanded((prev) => !prev)}
            data-testid="product-header"
          >
            <div className="flex items-center gap-3">
              <span
                className="font-semibold text-gray-900"
                data-testid="supplier-name"
              >
                {order.supplier.business_user_detail.business_name}
              </span>
              <NavLink
                href={`/business-user/${supplierId}`}
                data-testid="profile-link"
              >
                ({t("order.order_details.view_profile")})
              </NavLink>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-sm text-gray-500"
                data-testid="products-length"
              >
                {t("order.cart.product")} ({products.length})
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
            <div
              className="border-t divide-y divide-gray-200"
              data-testid="product-details"
            >
              <div className="p-4 flex items-center gap-6">
                {product.variant_images?.[0] && (
                  <img
                    src={product.variant_images?.[0].url}
                    alt={product.variant_images?.[0].title}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    data-testid="product-image"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-lg font-medium text-gray-900 truncate"
                      data-testid="product-title"
                    >
                      {product[`title_${lang}`] || product.title_en || ""}
                    </h3>
                  </div>
                  <p
                    className="text-sm text-gray-600"
                    data-testid="product-description"
                  >
                    {product[`short_desc_${lang}`] ||
                      product.short_desc_en ||
                      ""}
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-900 mt-2"
                    data-testid="product-price"
                  >
                    $ {product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="text-lg font-medium text-gray-900 w-8 text-center"
                    data-testid="product-quantity"
                  >
                    {product.quantity}
                  </span>
                  <span
                    data-testid="product-status"
                    className={`px-3 py-1 text-sm rounded-lg ${
                      product.product_status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.product_status === 1
                      ? t("order.order_details.selected")
                      : t("order.order_details.not_selected")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export { CartItems };