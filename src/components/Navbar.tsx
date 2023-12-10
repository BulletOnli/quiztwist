import AccountAvatar from "./AccountAvatar";
import { Button } from "@/components/ui/button";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="w-full sticky top-0 z-50 flex justify-center items-center p-3 bg-inherit border-b border-b-[#DEE2E6]">
            <div className="w-full max-w-[1000px] flex justify-between items-center  ">
                <Link href="/">
                    <p>Navbar</p>
                </Link>

                <div className="flex items-center gap-2">
                    <ToggleTheme />
                    {session?.user ? (
                        <AccountAvatar user={session?.user} />
                    ) : (
                        <>
                            <Link href="/login">
                                <Button size="sm" variant="outline">
                                    Sign in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
