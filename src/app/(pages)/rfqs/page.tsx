import RFQsPage from "@/components/pages/RFQsPage/RFQsPage";
import { RFQs } from "@/config/metadata";
export const metadata = RFQs;

export default async function Page() {
  return <RFQsPage />;
}
