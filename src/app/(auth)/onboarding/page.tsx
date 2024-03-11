import Onboardingform from "@/app/(auth)/_components/Onboardingform";
import authOptions from "@/utils/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Manage your Account | QuizTwist",
};

const OnBoardingPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "Guest") redirect("/dashboard");

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <Onboardingform />
    </div>
  );
};

export default OnBoardingPage;
