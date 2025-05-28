import Text from "@/components/atoms/Text/Text";
import {
  useMutateDeleteBasket,
  useMutateEditQuantity,
} from "@/hooks/useOrders";
import { CartItemType } from "@/types/Orders";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const CartItem = ({
  item,
  isCheckout,
}: {
  item: CartItemType;
  isCheckout?: boolean;
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(item.quantity);
  const queryClient = useQueryClient();
  const { mutateAsync: updateQuantity, isPending: isUpdatingQuantity } =
    useMutateEditQuantity();
  const { mutateAsync, isPending: isDeleting } = useMutateDeleteBasket();

  const handleQuantityChange = (delta: number): void => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
    updateQuantity({ itemId: item.id, quantity: newQuantity })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      })
      .catch(() => {
        toast.error(t("order.cart.error_updating_quantity"));
        setQuantity(item.quantity);
      });
  };

  const handleDeleteBasket = (id: number) => {
    mutateAsync(id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.info(t("order.cart.basket_deleted_successfully"));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="p-4 flex items-center gap-6">
      {item.variant.images?.[0] && (
        <img
          src={item.variant.images[0].url}
          alt={item.variant.images[0].title}
          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {item.variant.product.title_en}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {item.variant.product.short_des_en}
        </p>
        <p className="text-lg font-semibold text-gray-900 mt-2">
          $ {item.variant.price.toLocaleString()}
        </p>
      </div>
      {isCheckout ? (
        <div className="flex items-center gap-2">
          <Text>{t("order.cart.quantity")}:</Text>
          <span className="text-lg font-medium text-gray-900 w-8 text-center">
            {quantity}
          </span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button
              className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              onClick={() => handleQuantityChange(-1)}
              disabled={isUpdatingQuantity}
              data-testid="minus"
            >
              <FiMinus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-900 w-8 text-center">
              {quantity}
            </span>
            <button
              data-testid="plus"
              className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              onClick={() => handleQuantityChange(1)}
              disabled={isUpdatingQuantity || isDeleting}
            >
              <FiPlus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <button
            onClick={() => handleDeleteBasket(item.id)}
            className="w-8 h-8 border rounded-md flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
            disabled={isDeleting}
            data-testid="delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default CartItem;
