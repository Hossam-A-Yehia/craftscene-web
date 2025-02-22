import { GroupedProducts } from "@/types/Orders";
import React, { useEffect, useState } from "react";
import { SupplierSection } from "../SupplierSection/SupplierSection";
import Loader from "@/components/atoms/Loader/Loader";
import NoData from "@/components/molecules/NoDate/NoDate";
const CartItems = ({
  products,
  isLoading,
  isCheckout,
}: {
  products: GroupedProducts;
  isLoading: boolean;
  isCheckout?: boolean;
}) => {
  const [productData, setProductData] = useState<GroupedProducts>({});

  useEffect(() => {
    if (products) {
      setProductData(products);
    }
  }, [products]);

  if (isLoading) {
    return <Loader />;
  }
  const allProducts = Object.entries(productData);

  if (allProducts.length === 0) {
    return <NoData />;
  }
  return (
    <div className="space-y-6">
      {allProducts.map(([supplierName, items]) => (
        <SupplierSection
          key={supplierName}
          items={items}
          isCheckout={isCheckout}
        />
      ))}
    </div>
  );
};

export { CartItems };
