import IncomingOrdersPage from "@/components/pages/IncomingOrders/IncomingOrdersPage";
import { orders } from "@/config/metadata";
export const metadata = orders;

export default async function Page() {
  return <IncomingOrdersPage />;
}
