"use client";
import ProductsImages from "@/components/organisms/ProductsImages/ProductsImages";
import ProductsInfo from "@/components/organisms/ProductsInfo/ProductsInfo";
import { Product, Variant, VariantProduct } from "@/types/Products";
import React, { useState } from "react";

export default function ProductDetails({
  product,
  variants,
}: {
  product: Product;
  variants: VariantProduct;
}) {
  const attributes = Object.keys(variants.attributes || {}) as Array<
    keyof typeof variants.attributes
  >;
  const initialFilters = attributes.reduce((acc, attr) => {
    acc[attr] = variants.variants[0]?.[attr]?.en || "";
    return acc;
  }, {} as Record<keyof typeof variants.attributes, string>);

  const [filters, setFilters] = useState(initialFilters);

  const currentVariant = variants?.variants?.filter((variant) => {
    return attributes.every((attr) => {
      const key = attr as keyof Variant;
      const value = variant[key] as { en?: string };
      return !filters[attr] || value?.en === filters[attr];
    });
  });

  const handleFilterChange = (
    attribute: keyof typeof variants.attributes,
    value: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [attribute]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <ProductsImages currentVariant={currentVariant} />
      <ProductsInfo
        product={product}
        variants={variants}
        currentVariant={currentVariant}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
