import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell, LogOut, Package, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

import React from "react";
import PrevButton from "./sub-ui/prevButton";

export default function ProfileNavbar() {
  function getUserInfo(): { name: string; email: string } {
    const token = cookies().get("user")?.value;
    const decodedToken = token
      ? (decodeJwt(token) as { fullName?: string; email?: string })
      : {};

    return {
      name: decodedToken.fullName ?? "Guest",
      email: decodedToken.email ?? "No Email",
    };
  }

  const { name, email } = getUserInfo();

  return (
    <nav className="w-full h-auto py-2 px-4 flex flex-row justify-between items-center">
      <div className="">
        <PrevButton />
      </div>
      <div className=""></div>
      <div className="flex flex-row justify-start items-center gap-4">
        <ModeToggle />
        <div className="">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">
                  User Profile
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {email}
                  </p>
                </div>
              </div>
              <Separator className="my-6" />
              <SheetDescription>
                <nav className="space-y-2">
                  {navigData.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={item.href}>
                        {item.icon}
                        {item.label}
                      </a>
                    </Button>
                  ))}
                </nav>
              </SheetDescription>
              <Separator className="my-6" />
              <form>
                <Button className="w-full bg-blue-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

const navigData = [
  {
    href: "/profile",
    icon: <User className="mr-2 h-4 w-4" />,
    label: "Profile",
  },
  {
    href: "#notifications",
    icon: <Bell className="mr-2 h-4 w-4" />,
    label: "Notifications",
  },
  {
    href: "#orders",
    icon: <Package className="mr-2 h-4 w-4" />,
    label: "Orders",
  },
  {
    href: "#settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    label: "Account Settings",
  },
];
