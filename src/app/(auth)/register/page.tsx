import GoogleSignInBtn from "@/app/(auth)/_components/GoogleSignInBtn";
import authOptions from "@/utils/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create an account",
};

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="w-full flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mt-6">Create an account!</h1>
      <p className="text-sm text-secondary-grayText">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black dark:text-[#edf6f9] hover:underline"
        >
          Sign in
        </Link>
      </p>
      <div className="w-[25rem] flex flex-col items-center gap-4 mt-6 border p-8 rounded-lg shadow-md">
        <p className="text-lg">Welcome to QuizTwist</p>
        <GoogleSignInBtn />
      </div>
    </div>
  );
};

export default RegisterPage;
