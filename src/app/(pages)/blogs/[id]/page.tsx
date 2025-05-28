import BlogPage from "@/components/pages/Blog/Blog";
import { blog } from "@/config/metadata";
import React from "react";
export const metadata = blog;
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <BlogPage id={id} />;
}
