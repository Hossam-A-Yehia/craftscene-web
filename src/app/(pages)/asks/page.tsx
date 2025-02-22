import AsksPage from "@/components/pages/AsksPage/AsksPage";
import { asks } from "@/config/metadata";
export const metadata = asks;

export default async function Page() {
  return <AsksPage />;
}
