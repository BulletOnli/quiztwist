"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HEADER_LINKS = [
  {
    title: "Classwork",
  },
  {
    title: "People",
  },
  {
    title: "Settings",
  },
];

const RoomHeaderLinks = ({ roomId }: { roomId: string }) => {
  const pathname = usePathname();

  const currentPathname = pathname.split("/").pop();

  return (
    <ul className="flex items-center justify-end gap-10 mr-[10rem] font-medium bg-none">
      {HEADER_LINKS.map((link) => (
        <Link href={`/r/${roomId}/${link.title.toLowerCase()}`}>
          <li
            className={`${
              currentPathname === link.title.toLowerCase()
                ? "border-black"
                : "border-transparent"
            } border-b-2`}
          >
            {link.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default RoomHeaderLinks;
