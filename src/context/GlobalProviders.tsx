"use client";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "sonner";

type ProvidersProps = {
    children: React.ReactNode;
};

const GlobalProviders = ({ children }: ProvidersProps) => {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster richColors />
            </ThemeProvider>
        </SessionProvider>
    );
};

export default GlobalProviders;
