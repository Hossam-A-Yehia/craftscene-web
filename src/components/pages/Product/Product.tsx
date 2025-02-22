import Container from "@/components/atoms/Container/Container";
import Similar from "@/components/organisms/Idea/Similar/Similar";
import ProductAttributes from "@/components/organisms/ProductAttributes/ProductAttributes";
import ProductDetails from "@/components/templates/ProductDetails/ProductDetails";
import { getProduct, getVariants, SimilarProducts } from "@/services/Products";
import React from "react";

export default async function Product({ productId }: { productId: string }) {
  const productData = await getProduct(productId);
  const getVariantsData = await getVariants(productId);
  const product = productData?.payload.data[0];
  const similarProductsData = await SimilarProducts({ productId });
  const similarProducts = similarProductsData?.payload?.data;
  const variants = getVariantsData?.payload;
  return (
    <div className="bg-[#F6F7FC] py-6 ">
      <Container>
        <ProductDetails product={product} variants={variants} />
        <ProductAttributes data={product.values} />
        <div className="my-10 h-full mt-[80px]">
          <Similar
            data={similarProducts}
            title="products.similar_products"
            link={`products`}
          />
        </div>
      </Container>
    </div>
  );
}
