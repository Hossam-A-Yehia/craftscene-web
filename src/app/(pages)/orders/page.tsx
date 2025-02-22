import OrdersPage from "@/components/pages/Orders/OrdersPage";
import { orders } from "@/config/metadata";
export const metadata = orders;

export default async function Page() {
  return <OrdersPage />;
}
