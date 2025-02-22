"use client";
import React from "react";
import Text from "@/components/atoms/Text/Text";
import Card from "@/components/molecules/Card/Card";
import { Idea } from "@/types/Ideas";
import { ProjectType } from "@/types/Projects";
import { useLanguage } from "@/hooks/useLanguage";
import NoData from "@/components/molecules/NoDate/NoDate";

export default function ProjectDetails({ project }: { project: ProjectType }) {
  const lang = useLanguage();
  return (
    <>
      <Text className="text-xl text-center mb-4 font-bold">
        {project.payload[`title_${lang}`] || project.payload[`title_en`]}
      </Text>
      <div
        className={`w-full h-[300px] bg-cover relative`}
        style={{
          backgroundImage: `url('${project.payload.images[0].url}')`,
        }}
      ></div>
      <div className="Ideas">
        <Text className="text-md text-slate-600 my-4">
          All ideas about{" "}
          {project.payload[`title_${lang}`] || project.payload[`title_en`]}
        </Text>
        {project?.payload?.ideas.length === 0 && <NoData />}
        <div className="h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {project?.payload?.ideas.map((idea: Idea) => (
            <div className="col-span-1" key={idea.id}>
              <Card
                imageUrl={idea.images[0].url}
                altText={idea.images[0].title}
                link={`/idea/${idea.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
