"use client";
import { redirect, usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/components/ThemeProvider";
import { useEffect } from "react";

type ProvidersProps = {
    children: React.ReactNode;
    session?: any;
};

const Providers = ({ children }: ProvidersProps) => {
    const pathname = usePathname();
    const role: unknown = "Teacher";

    useEffect(() => {
        if (pathname !== "/") {
            if (role === "Student" && !pathname.startsWith("/s")) {
                redirect("/s/dashboard");
            } else if (role === "Teacher" && pathname.startsWith("/s")) {
                redirect("/dashboard");
            } else if (role === "") {
                redirect("/onboarding");
            }
        }
    }, []);

    if (pathname !== "/") {
        if (role === "Student" && !pathname.startsWith("/s")) {
            return <div className="w-full h-screen bg-white"></div>;
        } else if (role === "Teacher" && pathname.startsWith("/s")) {
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
