"use client";
import { useSession, signIn } from "next-auth/react";
import AccountAvatar from "./AccountAvatar";
import { Button } from "@/components/ui/button";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <nav className="w-full sticky top-0 flex justify-center items-center p-3 bg-inherit border-b border-b-[#DEE2E6]">
            <div className="w-full max-w-[1000px] flex justify-between items-center  ">
                <Link href="/">
                    <p>Navbar</p>
                </Link>

                <div className="flex items-center gap-2">
                    <ToggleTheme />

                    {user ? (
                        <AccountAvatar />
                    ) : (
                        <div>
                            <Button size="sm" onClick={() => signIn()}>
                                Sign in
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
