import ReceivedAsksPage from "@/components/pages/ReceivedAsksPage/ReceivedAsksPage";
import { asks } from "@/config/metadata";
export const metadata = asks;

export default async function Page() {
  return <ReceivedAsksPage />;
}
