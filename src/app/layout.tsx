import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import GlobalProviders from "@/context/GlobalProviders";
import { poppins } from "@/utils/googleFonts";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: {
    default: "QuizTwist",
    template: "%s - QuizTwist",
  },
  description:
    "Engage students with interactive quizzes and track progress seamlessly.",
  keywords: [
    "quizzes",
    "classroom",
    "education",
    "assessment",
    "learning",
    "fun",
    "quiz",
    "quiz-app",
    "exam",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} w-full flex flex-col items-center`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <GlobalProviders>
          <Navbar />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
