import Hero from "@/components/organisms/home/Hero/Hero";
import React from "react";
import HomeResponsibilitySection from "@/components/organisms/home/HomeResponsibilitySection/HomeResponsibilitySection";
import Container from "@/components/atoms/Container/Container";
import FeatruesSlider from "@/components/organisms/home/FeatruesSlider/FeatruesSlider";
import OurService from "@/components/organisms/home/ServiceSection/ServiceSection";
import Stats from "@/components/organisms/home/StatsSection/StatsSection";
import PackegesSection from "@/components/organisms/home/PackegesSection/PackegesSection";
import { IdeasHome, Packeges, Products } from "@/services/home/Home";
import { businessUsers } from "@/services/user/user";
import { PROFESSIONALS, SUPPLIER } from "@/constants/constants";
import BlogsSection from "@/components/organisms/home/BlogsSection/BlogsSection";
import { getBlogs } from "@/services/Blogs";
export default async function HomePage() {
  const ideasData = await IdeasHome();
  const productsData = await Products();
  const professionals = await businessUsers(PROFESSIONALS);
  const suppliers = await businessUsers([SUPPLIER]);
  const packegesData = await Packeges();
  const blogs = await getBlogs();

  return (
    <>
      <Hero />
      <HomeResponsibilitySection />
      <Container>
        <FeatruesSlider
          ideasData={ideasData}
          productsData={productsData}
          professionals={professionals}
          suppliers={suppliers}
        />
        <OurService />
      </Container>
      <Stats />
      <PackegesSection packegesData={packegesData} />
      <Container>
      <BlogsSection blogs={blogs} />
      </Container>
    </>
  );
}
