"use client";

import { usePathname, useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/components/ThemeProvider";
import { useEffect } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const isStudent = true;

    useEffect(() => {
        if (pathname !== "/") {
            if (isStudent && !pathname.startsWith("/s")) {
                router.push("/s/dashboard");
            } else if (!isStudent && pathname.startsWith("/s")) {
                router.push("/dashboard");
            }
        }
    }, []);

    if (pathname !== "/") {
        if (isStudent && !pathname.startsWith("/s")) {
            return <div className="w-full h-screen bg-white"></div>;
        } else if (!isStudent && pathname.startsWith("/s")) {
            return <div className="w-full h-screen bg-white"></div>;
        }
    }

    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
};

export default Providers;
