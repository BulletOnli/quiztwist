import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import GlobalProviders from "@/context/GlobalProviders";
import { poppins } from "@/utils/googleFonts";

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
        <GlobalProviders>
          <Navbar />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
