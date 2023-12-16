"use client";

import { usePathname } from "next/navigation";

const NO_SIDEBAR = ["/dashboard", "/s/dashboard"];

const Sidebar = () => {
    const pathname = usePathname();

    if (NO_SIDEBAR.includes(pathname)) {
        return null;
    }

    return (
        <div className="w-[20rem]  h-[93.5vh] sticky top-[3.8rem] p-4 flex flex-col items-center bg-secondary border-r border-[#CED4DA]">
            sdfds
        </div>
    );
};

export default Sidebar;
