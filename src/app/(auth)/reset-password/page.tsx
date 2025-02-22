import { resetPasswordMetadata } from "@/config/metadata";
import ResetPasswordPage from "@/components/pages/ResetPassword/ResetPassword";
export const metadata = resetPasswordMetadata;

export default async function Page() {
  return <ResetPasswordPage />;
}
