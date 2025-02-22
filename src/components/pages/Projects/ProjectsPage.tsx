import Container from "@/components/atoms/Container/Container";
import ProjectDetails from "@/components/templates/ProjectDetails/ProjectDetails";
import { getProject } from "@/services/Projects";
import React from "react";

export default async function ProjectsPage({
  projectId,
}: {
  projectId: string;
}) {
  const projectsData = await getProject(projectId);
  const project = projectsData;
  return (
    <div className=" py-5">
      <Container>
        <ProjectDetails project={project} />
      </Container>
    </div>
  );
}
