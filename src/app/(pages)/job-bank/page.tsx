import JobBank from "@/components/pages/JobBank/JobBank";
import { jobBank } from "@/config/metadata";
import { Categories } from "@/services/home/Home";
export const metadata = jobBank;

export default async function Page() {
  const categories = await Categories();

  return <JobBank categoriesData={categories} />;
}
