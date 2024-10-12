"use client";
import React from "react";
import Image from "next/image";

import { DashboardIcon } from "@radix-ui/react-icons";
import {
  Bell,
  FolderKanbanIcon,
  MapIcon,
  MessageSquare,
  PackageSearchIcon,
  SettingsIcon,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const [iconSize] = useState(24);

  const menuIcons = [
    {
      icon: <DashboardIcon height={iconSize} width={iconSize} />,
      name: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: <User height={iconSize} width={iconSize} />,
      name: "Profile",
      link: "/admin/profile",
    },
    {
      icon: <Users height={iconSize} width={iconSize} />,
      name: "Users",
      link: "/admin/users",
    },
    {
      icon: <Bell height={iconSize} width={iconSize} />,
      name: "Notifications",
      link: "/admin/notifications",
    },
    {
      icon: <MessageSquare height={iconSize} width={iconSize} />,
      name: "Messages",
      link: "/admin/messages",
    },
    {
      icon: <PackageSearchIcon height={iconSize} width={iconSize} />,
      name: "Orders",
      link: "/admin/orders",
    },
    {
      icon: <FolderKanbanIcon height={iconSize} width={iconSize} />,
      name: "Products",
      link: "/admin/products",
    },
    {
      icon: <MapIcon height={iconSize} width={iconSize} />,
      name: "Map",
      link: "/admin/map",
    },
    {
      icon: <SettingsIcon height={iconSize} width={iconSize} />,
      name: "Settings",
      link: "/admin/settings",
    },
  ];

  const router = useRouter();

  return (
    <div className="w-[4%] h-dvh flex flex-wrap justify-center items-center">
      <div className="h-full w-4/5 flex flex-col flex-wrap justify-start items-center">
        <Image
          src="/logo_dark.png"
          className="border-b py-[5px]"
          height={48}
          width={48}
          alt="logo"
        />

        <div className="w-full h-[calc(100%-60px)] flex flex-col flex-wrap justify-around items-center">
          {menuIcons.map((item, index) => (
            <TooltipProvider delayDuration={100} key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(item.link);
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={12}
                  align="center"
                  className="bg-background text-foreground"
                >
                  <p className="text-md font-bold">{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
