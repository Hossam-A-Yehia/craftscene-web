"use client";

import React, { useState, useMemo } from "react";
import PaymentSummary from "@/components/organisms/Cart/PaymentSummary/PaymentSummary";
import { useFetchCart, useMutateAddOrder } from "@/hooks/useOrders";
import { CartItems } from "@/components/organisms/Cart/CartItems/CartItems";
import { t } from "i18next";
import Button from "@/components/atoms/Button/Button";
import DeliveryAddress from "@/components/organisms/Cart/DeliveryAddress/DeliveryAddress";
import { useFetchAddress } from "@/hooks/useAddress";
import PhoneNumber from "@/components/organisms/Cart/PhoneNumber/PhoneNumber";
import PaymentMethod from "@/components/organisms/Cart/PaymentMethod/PaymentMethod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Address } from "@/types/Address";
import { useUser } from "@/context/UserContext";
import { IoMdWarning } from "react-icons/io";

type Product = {
  id: any;
  quantity?: number;
  variant?: {
    price?: number;
  };
};

type Payload = Record<string, Product[]>;

export default function CheckoutTemplate({ userId }: { userId: string }) {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isPhoneError, setIsPhoneError] = useState<boolean | false>(false);

  const { data: products, isLoading: isCartLoading } = useFetchCart(userId);
  const { userData: user, isLoading: isUserLoading } = useUser();
  const { data: addresses } = useFetchAddress(userId);
  const { mutateAsync, isPending } = useMutateAddOrder();

  const phoneNumber = user?.phone;

  const subTotal = useMemo(() => {
    return Object.entries((products?.payload || {}) as Payload).reduce(
      (total, [, items]) =>
        total +
        items.reduce(
          (acc, item) =>
            acc + (item.quantity ?? 0) * (item.variant?.price ?? 0),
          0
        ),
      0
    );
  }, [products]);

  const groupedBySupplier = useMemo(() => {
    return Object.entries(products?.payload || {}).map(
      ([supplierId, items]) => {
        const productList = items as Product[];
        return {
          supplierId: Number(supplierId),
          productIds: productList.map((item) => item.id),
          supplierTotal: productList.reduce(
            (total, item) =>
              total + (item.quantity ?? 0) * (item.variant?.price ?? 0),
            0
          ),
        };
      }
    );
  }, [products]);

  const handleOrderSubmission = async () => {
    if (!selectedAddress) {
      toast.error(t("order.checkout.no_addresses_available"));
      return;
    }
    if (!phoneNumber) {
      setIsPhoneError(true);
      return;
    }

    try {
      await Promise.all(
        groupedBySupplier.map(async (supplier) => {
          const structuredData = {
            phone: phoneNumber,
            address_id: selectedAddress.id,
            basket_items: supplier.productIds,
            total_price: supplier.supplierTotal,
          };

          await mutateAsync(structuredData);
        })
      );
      toast.success(t("Order Added Successfully!"));
      router.push(`/orders`);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || t("Something went wrong!");
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-2xl font-bold text-gray-900 mb-8"
          data-testid="title"
        >
          {t("order.checkout.checkout")}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <CartItems
              products={products?.payload}
              isLoading={isCartLoading}
              isCheckout
            />
            <div className="w-full mt-5">
              <PaymentSummary
                subTotal={subTotal}
                shipping=""
                userId={userId}
                isCheckout
              />
            </div>
          </div>
          <div className="w-96">
            <DeliveryAddress
              addresses={addresses}
              userId={userId}
              onAddressChange={setSelectedAddress}
            />
            <PhoneNumber
              phone={Number(phoneNumber)}
              isLoading={isUserLoading}
            />
            {isPhoneError && (
              <div className="flex items-center text-red-500 rounded-md pt-2">
                <IoMdWarning
                  className="size-3 mr-2 rtl:ml-2"
                  data-testid="warning-icon"
                />
                <span className="text-xs font-medium">
                  {"Please add your phone to proceed with your order"}
                </span>
              </div>
            )}
            <PaymentMethod />
          </div>
        </div>
        <div className="w-1/4 mx-auto mt-5">
          <Button
            variant="main"
            onClick={handleOrderSubmission}
            disabled={isPending}
          >
            {t("order.checkout.submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
