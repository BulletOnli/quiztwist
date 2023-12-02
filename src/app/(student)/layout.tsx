import type { Metadata } from "next";
import { poppins } from "@/lib/utils";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Provider from "../Providers";

export const metadata: Metadata = {
    title: "Quiz101",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${poppins.className} `}>
                <Provider>
                    <Navbar />
                    <div className="w-full flex ">
                        <div className="w-[40rem] h-screen border">
                            student sidebar
                        </div>
                        {children}
                    </div>
                </Provider>
            </body>
        </html>
    );
}
