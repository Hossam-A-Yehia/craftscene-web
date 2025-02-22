import LoginPage from "@/components/pages/Login/Login";
import { loginMetadata } from "@/config/metadata";
export const metadata = loginMetadata;

export default async function Page() {
  return <LoginPage />;
}
