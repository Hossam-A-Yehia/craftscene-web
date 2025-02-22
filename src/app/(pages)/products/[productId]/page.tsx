import Product from "@/components/pages/Product/Product";
import { product } from "@/config/metadata";
export const metadata = product;

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  return <Product productId={productId} />;
}
