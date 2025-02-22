import AddressTemplate from "@/components/templates/Address/AddressTemplate";
import React from "react";

export default async function AddressPage({ userId }: { userId: string }) {
  return <AddressTemplate userId={userId} />;
}
