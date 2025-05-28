import BlogTemplate from "@/components/templates/Blog/BlogTemplate";
import { getBlog } from "@/services/Blogs";
import React from "react";

export default async function BlogPage({ id }: { id: string }) {
    const blogs = await getBlog(id);

  return <BlogTemplate blogs={blogs} />;
}
