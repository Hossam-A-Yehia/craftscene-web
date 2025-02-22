import Footer from "@/components/organisms/Footer/Footer";
import Header from "@/components/organisms/Header/Header";
import { Categories } from "@/services/home/Home";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await Categories();
  return (
    <>
      <Header categoriesData={categories} />
      {children}
      <Footer />
    </>
  );
}
