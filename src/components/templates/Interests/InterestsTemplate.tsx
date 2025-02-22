import React from "react";
import Container from "@/components/atoms/Container/Container";
import InterestsPage from "@/components/organisms/InterestsPage/InterestsPage";
import { Categories } from "@/services/home/Home";
import { CategoriesData } from "@/types/Organisms";
import { CRAFTSMEN_ID } from "@/constants/constants";
import { fetchInterests } from "@/services/user/user";

type InterestsTemplateProps = {
  userId: string;
};

const InterestsTemplate: React.FC<InterestsTemplateProps> = async ({
  userId,
}) => {
  const categoriesData = await Categories();
  const userInterests = await fetchInterests(userId);
  const categories = categoriesData?.payload?.filter(
    (category: CategoriesData) => category.id !== CRAFTSMEN_ID
  );
  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      <Container>
        <InterestsPage
          categories={categories}
          userInterests={userInterests}
          userId={userId}
        />
      </Container>
    </div>
  );
};

export default InterestsTemplate;
