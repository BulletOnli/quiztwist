"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HEADER_LINKS = [
  "Classwork",
  "Announcements",
  "People",
  "Settings",
] as const;

const RoomHeaderLinks = ({ roomId }: { roomId: string }) => {
  const pathname = usePathname();

  const currentPathname = pathname.split("/").pop();

  return (
    <ul className="flex items-center justify-end gap-10 mr-[2rem] font-medium bg-none">
      {HEADER_LINKS.map((link) => (
        <Link key={link} href={`/r/${roomId}/${link?.toLowerCase()}`}>
          <li
            className={`${
              currentPathname === link?.toLowerCase()
                ? "border-black"
                : "border-transparent"
            } border-b-2 hover:border-black hover:border-opacity-50`}
          >
            {link}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default RoomHeaderLinks;
