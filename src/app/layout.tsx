import ClientOnlyWrapper from "@/components/organisms/ClientOnlyWrapper";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login | CraftScene App",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className}`}>
        <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      </body>
    </html>
  );
}
