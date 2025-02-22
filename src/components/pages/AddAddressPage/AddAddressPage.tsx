import AddAddressTemplate from "@/components/templates/AddAddress/AddAddressTemplate";
import React from "react";

export default async function AddAddressPage({ userId }: { userId: string }) {
  return <AddAddressTemplate userId={userId} />;
}
