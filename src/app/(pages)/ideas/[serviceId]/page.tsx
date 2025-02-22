import Ideas from "@/components/pages/Ideas/Ideas";
import { ideas } from "@/config/metadata";
export const metadata = ideas;

export default async function Page() {
  return <Ideas />;
}
