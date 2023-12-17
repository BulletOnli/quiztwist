"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NO_SIDEBAR = ["/dashboard", "/s/dashboard"];

const Sidebar = () => {
    const pathname = usePathname();

    if (NO_SIDEBAR.includes(pathname)) {
        return null;
    }

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

            <div className="w-full flex flex-col items-center gap-4">
                <p>Classrooms</p>
                <div className="w-full flex flex-col items-center">
                    <Link href="/">
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    Introduction to Computing
                                </p>
                                <p className="text-xs">BSIT 1A</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    Introduction to Computing
                                </p>
                                <p className="text-xs">BSIT 1A</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    Introduction to Computing
                                </p>
                                <p className="text-xs">BSIT 1A</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    Introduction to Computing
                                </p>
                                <p className="text-xs">BSIT 1A</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    Introduction to Computing
                                </p>
                                <p className="text-xs">BSIT 1A</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="hover:bg-secondary py-2 px-3 rounded-full flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="w-full text-sm overflow-x-hidden whitespace-nowrap">
                                    Introduction to Computing
                                </p>
                                <p className="text-xs">BSIT 1A</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
