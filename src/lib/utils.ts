import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
