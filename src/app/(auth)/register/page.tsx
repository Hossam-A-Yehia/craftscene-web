import { registerMetadata } from "@/config/metadata";
import ResgisterPage from "@/components/pages/Resgister/Resgister";
export const metadata = registerMetadata;

export default async function Page() {
  return <ResgisterPage />;
}
