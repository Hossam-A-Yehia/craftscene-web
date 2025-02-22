import Products from "@/components/pages/Products/Products";
import { ideas } from "@/config/metadata";
export const metadata = ideas;

export default async function Page() {
  return <Products />;
}
