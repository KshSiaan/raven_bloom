"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ui/mode-toggle";
import ShopCartDrawer from "./sub-ui/shopcartdrawer";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Bell,
  CogIcon,
  LogOut,
  Menu,
  Package,
  Settings,
  User,
} from "lucide-react";
import { decodeJwt } from "jose";
// import { cookies } from "next/headers"
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState("Guest");
  const [email, setEmail] = useState("No Email");
  const [isAdmin, setIsAdmin] = useState(false);
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const getUserInfo = () => {
      const token = cookies.user;
      if (token) {
        const decodedToken = decodeJwt(token) as {
          fullName: string;
          email: string;
          isAdmin: boolean;
        };
        setName(decodedToken.fullName ?? "Guest");
        setEmail(decodedToken.email ?? "No Email");
        setIsAdmin(decodedToken.isAdmin);
        console.log(decodedToken);

        setAuth(true);
      } else {
        setAuth(false);
      }
    };

    getUserInfo();
  }, [cookies.user]);

  const handleLogout = async () => {
    removeCookie("user");
    setAuth(false);
    router.push("/");
  };
  const { theme } = useTheme();

  return (
    <nav className="h-[48px] w-full bg-background shadow-md shadow-background flex justify-between items-center px-4 fixed top-0 left-0 z-50">
      {/* Left side */}
      <div className="flex-1 flex justify-start">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="hidden lg:block">
          <Link href="/">
            <Image
              src={theme == "light" ? "/logo_light.png" : "/logo_dark.png"}
              width="48"
              height="48"
              alt="logo"
            />
          </Link>
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex justify-center">
        <div className="lg:hidden text-xl font-bold">RavenBloom</div>
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navbarItems.map((item, index) =>
                item.hasChild ? (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="font-bold text-sm leading-none">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 lg:w-[250px]">
                      <div className="w-full grid grid-flow-row gap-y-5">
                        {item.child?.map((childItem, childIndex) => (
                          <NavigationMenuLink key={childIndex} asChild>
                            <Link
                              href="#"
                              className="hover:text-zinc-700 dark:hover:text-zinc-300"
                            >
                              {childItem.title}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.link}
                        className="block font-bold text-sm select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <ShopCartDrawer />
        <div className="hidden lg:block">
          <ModeToggle />
        </div>
        {auth ? (
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
                  {isAdmin ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/admin">
                        <CogIcon className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </Button>
                  ) : (
                    ""
                  )}
                  {navigData.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </SheetDescription>
              <Separator className="my-6" />
              <Button className="w-full bg-blue-700" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </SheetContent>
          </Sheet>
        ) : (
          <Link
            href="/auth"
            className="font-bold text-sm text-zinc-800 dark:text-zinc-200"
          >
            Sign Up
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            {navbarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
          <Separator className="my-6" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Theme</span>
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

const navbarItems = [
  { title: "Shop", link: "/shop", hasChild: false },
  { title: "Gallery", link: "/gallery", hasChild: false },
  {
    title: "Services",
    link: "/",
    hasChild: true,
    child: [
      { title: "Flower Subscription" },
      { title: "Blog" },
      { title: "Custom Arrangements" },
      { title: "Consultations" },
    ],
  },
  { title: "About us", link: "/about", hasChild: false },
  { title: "Contact us", link: "/contact", hasChild: false },
];

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
    href: "/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    label: "Account Settings",
  },
];
