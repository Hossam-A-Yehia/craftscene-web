import Container from "@/components/atoms/Container/Container";
import ImageCard from "@/components/organisms/Idea/ImageCard/ImageCard";
import React from "react";
import AuthorProfile from "@/components/organisms/Idea/AuthorProfile/AuthorProfile";
import Similar from "@/components/organisms/Idea/Similar/Similar";
import { Ideas, SimilarIdeas } from "@/services/Ideas";
import { getProject } from "@/services/Projects";
export default async function Idea({ ideaId }: { ideaId: string }) {
  const ideasData = await Ideas({ ideaId });
  const similarIdeasData = await SimilarIdeas({ ideaId });
  const similarIdeas = similarIdeasData?.payload?.data;
  const idea = ideasData?.payload?.data[0];
  const projectDetails = await getProject(idea?.user_project_id);
  const relatedIdeas = projectDetails?.payload?.ideas.filter(
    (idea: { id: number }) => String(idea.id) !== String(ideaId)
  );

  return (
    <div className="min-h-screen pt-3 px-2 bg-[#F6F7FC]">
      <Container>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 h-[500px] items-center mt-4">
          <ImageCard data={idea} />
          <AuthorProfile data={idea} projectDetails={projectDetails} />
        </div>
        <div className="h-full mt-[80px]  ">
          <Similar data={relatedIdeas} title="idea.related_ideas" link="idea" />
        </div>
        <div className=" pb-10 h-full mt-[30px]">
          <Similar data={similarIdeas} title="idea.similar_ideas" link="idea" />
        </div>
      </Container>
    </div>
  );
}
