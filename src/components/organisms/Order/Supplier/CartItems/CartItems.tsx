import { ResponseData } from "@/types/Orders";
import React from "react";
import Loader from "@/components/atoms/Loader/Loader";
import NoData from "@/components/molecules/NoDate/NoDate";
import { t } from "i18next";
import { useLanguage } from "@/hooks/useLanguage";
import Text from "@/components/atoms/Text/Text";

interface CartItemsProps {
  order: ResponseData;
  isLoading: boolean;
  checkedProducts: { [key: string]: boolean };
  onCheckboxChange: (productId: number) => void;
  onCheckAll: () => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  order,
  isLoading,
  checkedProducts,
  onCheckboxChange,
  onCheckAll,
}) => {
  const lang = useLanguage();
  const products = order?.products || [];

  if (isLoading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <NoData />;
  }

  const isAllChecked =
    products.length > 0 &&
    products.every((product) => checkedProducts[product.order_product_id]);

  const PENDING = 1;
  const SELECTED = 1;

  return (
    <div className="space-y-6" data-testid="cart-items-container">
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          data-testid="product-header"
        >
          <div className="flex items-center gap-3">
            {order?.order.status === PENDING && (
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={onCheckAll}
                className="w-5 h-5"
                data-testid="check-all"
              />
            )}
            <span className="font-semibold text-gray-900">
              {t("order.order_details.products")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-sm text-gray-500"
              data-testid="products-length"
            >
              {t("order.cart.product")} ({products.length})
            </span>
          </div>
        </div>
        {products.map((product) => (
          <div
            key={product.order_product_id}
            className="border-t divide-y divide-gray-200"
            data-testid="product-details"
          >
            <div className="p-4 flex items-center gap-6">
              {order?.order.status === PENDING && (
                <input
                  type="checkbox"
                  checked={!!checkedProducts[product.order_product_id]}
                  onChange={() => onCheckboxChange(product.order_product_id)}
                  className="w-5 h-5"
                  data-testid={`checkbox-${product.order_product_id}`}
                />
              )}
              {product.variant_images?.[0] && (
                <img
                  src={product.variant_images?.[0].url}
                  alt={product.variant_images?.[0].title}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  data-testid="order-product-image"
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
                <Text
                  className="text-sm text-gray-600"
                  testId="order-product-description"
                >
                  {product[`short_desc_${lang}`] || product.short_desc_en || ""}
                </Text>
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
                    product.product_status === SELECTED
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.product_status === SELECTED
                    ? t("order.order_details.selected")
                    : t("order.order_details.not_selected")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CartItems };
