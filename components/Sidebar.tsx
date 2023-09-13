"use client";

import { Song } from "@/types";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Box } from "./Box";
import { Library } from "./Library";
import { SidebarItem } from "./SidebarItem";

interface Props {
  songs: Song[];
  children?: ReactNode;
}

export const Sidebar: FC<Props> = ({ songs, children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full w-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.href} {...route} />
            ))}
          </div>
        </Box>

        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>

      {children}
    </div>
  );
};
