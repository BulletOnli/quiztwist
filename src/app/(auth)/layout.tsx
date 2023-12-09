import "@/styles/globals.css";
import Providers from "../../context/Providers";
import Navbar from "@/components/Navbar";
import { poppins } from "@/lib/utils";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
