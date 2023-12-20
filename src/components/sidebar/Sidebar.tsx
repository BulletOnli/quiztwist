"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import SidebarLinks from "./SidebarLinks";

const NO_SIDEBAR = ["/dashboard", "/s/dashboard"];

const Sidebar = () => {
    const pathname = usePathname();
    if (NO_SIDEBAR.includes(pathname)) return null;

    return (
        <div className="w-[20rem] h-[100vh] sticky top-[60px] p-4 flex flex-col items-center border-r border-[#CED4DA]">
            <div className="w-full">
                <div className="w-full flex flex-col items-center gap-2">
                    <Link href="/" className="w-full">
                        <Button variant="outline" size="lg" className="w-full">
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/" className="w-full">
                        <Button variant="outline" size="lg" className="w-full">
                            BSIT 1A
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full h-[1px] bg-borderColor my-4"></div>

            <SidebarLinks classrooms={[]} />
        </div>
    );
};

export default Sidebar;
