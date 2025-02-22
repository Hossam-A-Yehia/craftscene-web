import HomePage from "@/components/pages/Home/HomePage";
import { homeMatadata } from "@/config/metadata";
import React from "react";
export const metadata = homeMatadata;

const Home: React.FC = () => {
  return <HomePage />;
};

export default Home;
