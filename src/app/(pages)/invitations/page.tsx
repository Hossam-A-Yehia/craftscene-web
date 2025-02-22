import InvitationsPage from "@/components/pages/Invitations/InvitationsPage";
import { invitations } from "@/config/metadata";
export const metadata = invitations;

export default async function Page() {
  return <InvitationsPage />;
}
