import "@/styles/globals.css";
import GlobalProviders from "../../context/GlobalProviders";
import Navbar from "@/components/navbar/Navbar";
import { poppins } from "@/lib/utils";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <GlobalProviders>
                    <Navbar />
                    {children}
                </GlobalProviders>
            </body>
        </html>
    );
}
