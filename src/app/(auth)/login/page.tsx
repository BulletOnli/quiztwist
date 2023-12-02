import GoogleSignInBtn from "@/components/GoogleSignInBtn";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login | Quiz101",
    description: "Generated by create next app",
};

const LoginPage = () => {
    return (
        <div className="w-full flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mt-6">Welcome back!</h1>
            <p className="text-sm text-gray-400">
                Don't have an account yet?{" "}
                <Link
                    href="/register"
                    className="text-black dark:text-[#edf6f9] hover:underline"
                >
                    Create account
                </Link>
            </p>
            <div className="w-[25rem] flex flex-col items-center gap-4 mt-6 border p-8 rounded-lg shadow-md">
                <p className="text-lg">Welcome to Quiz101</p>
                <GoogleSignInBtn />
            </div>
        </div>
    );
};

export default LoginPage;
