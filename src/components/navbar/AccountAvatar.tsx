"use client";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { NextAuthUser } from "@/types/next-auth";
import Link from "next/link";

const AccountAvatar = ({ user }: { user: NextAuthUser }) => {
    const pathname = usePathname();

    if (pathname !== "/") {
        // Prevents users with the "Guest" role from accessing other routes.
        if (user?.role === "Guest" && pathname !== "/onboarding") {
            redirect("/onboarding");
        }

        // Redirect the user to the appropriate routes based on their role
        // This prevents user accessing routes that is not in eligible for their role
        if (user?.role === "Student" && !pathname.startsWith("/s")) {
            redirect(`/s${pathname}`);
        } else if (user?.role === "Teacher" && pathname.startsWith("/s")) {
            redirect(`${pathname.slice(2, pathname.length)}`);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage
                            src={user?.image || "https://github.com/shadcn.png"}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="w-[8rem] flex flex-col items-start overflow-x-hidden">
                        <p className="text-xs font-semibold">{user?.name}</p>
                        <small className="text-xs">{user?.email}</small>
                    </div>
                    <ChevronDown size={17} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <Link href="/">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountAvatar;