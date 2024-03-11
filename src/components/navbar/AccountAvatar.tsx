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
import { usePathname, useRouter } from "next/navigation";
import { NextAuthUser } from "@/types/next-auth";
import Link from "next/link";
import { useEffect } from "react";

const DROP_DOWN_LINKS = [
  {
    link: "/",
    icon: <User className="mr-2 h-4 w-4" />,
    name: "Profile",
  },
  {
    link: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    name: "Dashboard",
  },
];

const AccountAvatar = ({ user }: { user: NextAuthUser }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      // Prevents users with the "Guest" role from accessing other routes.
      if (user?.role === "Guest" && pathname !== "/onboarding") {
        router.push("/onboarding");
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt="Account Avatar"
            />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
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
        {DROP_DOWN_LINKS.map((link) => (
          <DropdownMenuItem key={link.link}>
            <Link href={link.link} className="flex items-center">
              {link.icon}
              <p>{link.name}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountAvatar;
