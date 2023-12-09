"use client";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/components/ThemeProvider";
import CheckRoleProvider from "./CheckRole";

type ProvidersProps = {
    children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
    return (
        <SessionProvider>
            <CheckRoleProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </CheckRoleProvider>
        </SessionProvider>
    );
};

export default Providers;
