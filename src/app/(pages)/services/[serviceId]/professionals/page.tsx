import Professionals from "@/components/pages/Professionals/Professionals";
import { professionals } from "@/config/metadata";
export const metadata = professionals;

export default async function Page() {
  return <Professionals />;
}
