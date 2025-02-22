import Product from "@/components/pages/Product/Product";
import { ideas } from "@/config/metadata";
export const metadata = ideas;

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  return <Product productId={productId} />;
}
