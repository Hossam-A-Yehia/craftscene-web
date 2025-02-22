import UpdateBusinessProfilePage from "@/components/pages/UpdateBusinessProfile/UpdateBusinessProfilePage";
import { businessProfile } from "@/config/metadata";
export const metadata = businessProfile;

export default async function Page() {
  return <UpdateBusinessProfilePage />;
}
