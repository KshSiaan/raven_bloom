"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search, Settings } from "lucide-react";
import React, { useState } from "react";

export default function Topnav() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="h-16 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 hidden lg:block">
          RB Dashboard
        </h1>
      </div>

      {/* Search Section */}
      <div
        className={`flex-grow mx-4 transition-all duration-300 ${
          isSearchVisible ? "opacity-100" : "opacity-0 lg:opacity-100"
        }`}
      >
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-500 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Toggle search</span>
        </Button>

        {/* Notifications Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Settings Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">shadcn</p>
                <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-300 dark:bg-zinc-700" />
            <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:bg-zinc-200 dark:focus:bg-zinc-700">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:bg-zinc-200 dark:focus:bg-zinc-700">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:bg-zinc-200 dark:focus:bg-zinc-700">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-300 dark:bg-zinc-700" />
            <DropdownMenuItem className="hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:bg-zinc-200 dark:focus:bg-zinc-700">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
