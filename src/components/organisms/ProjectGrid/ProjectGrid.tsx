import React from "react";
import CustomImage from "@/components/atoms/Image/CustomImage";
import { useLanguage } from "@/hooks/useLanguage";
import { Project } from "@/types/Projects";
import Text from "@/components/atoms/Text/Text";
import Link from "next/link";
interface ProjectProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectProps> = ({ projects }) => {
  const lang = useLanguage();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10 h-auto">
      {projects?.map((project: Project) => (
        <div className="cursor-pointer overflow-hidden" key={project.id}>
          <div className="bg-white text-start h-[250px] w-full relative hover:-rotate-2 duration-300">
            <Link href={`/projects/${project.id}`}>
              <CustomImage
                src={project.images[0].url || "/default.png"}
                alt={project[`title_${lang}`] || project.title_en || ""}
                className="object-cover mb-4"
                fill
              />
            </Link>
          </div>
          <Text className="mt-2">
            {project[`title_${lang}`] || project.title_en || ""}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
