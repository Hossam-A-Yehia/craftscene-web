import EditUserTemplate from "@/components/templates/EditUser/EditUserTemplate";
import React from "react";

export default async function EditUserPage({ userId }: { userId: string }) {
  return <EditUserTemplate userId={userId} />;
}
