import ProjectsPage from "@/components/pages/Projects/ProjectsPage";
import { projects } from "@/config/metadata";
import React from "react";
export const metadata = projects;

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  return <ProjectsPage projectId={projectId} />;
}
