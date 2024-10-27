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
import { decodeJwt } from "jose";
import ShopCartDrawer from "./sub-ui/shopcartdrawer";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Bell, LogOut, Package, Settings, User } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function Navbar() {
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

  const auth: boolean = !!cookies().get("user");

  async function handleLogout() {
    "use server";
    cookies().delete("user");
    redirect("/");
  }

  return (
    <nav className="h-[48px] w-full bg-background shadow-md shadow-background grid grid-cols-3 justify-center items-center px-2 absolute top-0 left-0">
      <div className="font-sans font-bold text-sm w-auto">
        <div className="h-[48px] w-[48px]">
          <Link href="/">
            <Image src="/logo_dark.png" width="48" height="48" alt="logo" />
          </Link>
        </div>
      </div>
      <div className="">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            {navbarItems.map((item, index) =>
              item.hasChild ? (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 lg:w-[250px]">
                    <div className="w-full grid grid-flow-row gap-y-5">
                      {item.child?.map((item, index) => (
                        <>
                          <NavigationMenuLink
                            key={index + 100}
                            // className={index == 0 ? "px-4 py-1" : "px-4 pb-2"}
                          >
                            <Link
                              href="#"
                              className="hover:text-zinc-700 dark:hover:text-zinc-300"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem
                  key={index}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <Link
                    href={item.link}
                    className="text-sm font-medium leading-none"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row flex-wrap justify-end items-center w-auto space-x-8">
        <ShopCartDrawer />

        <ModeToggle />

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
              <form action={handleLogout}>
                <Button className="w-full bg-blue-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="px-2 flex flex-row justify-around items-center space-x-8 font-bold text-sm text-zinc-800 dark:text-zinc-200">
            <Link href="/auth">Log in / Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const navbarItems = [
  { title: "Shop", link: "/shop", hasChild: false },
  { title: "Gallary", link: "/gallary", hasChild: false },
  {
    title: "Services",
    link: "/",
    hasChild: true,
    child: [
      { title: "Flower Subscription" },
      { title: "Blog" },
      { title: "Custom Arrangements" },
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
    href: "#settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    label: "Account Settings",
  },
];
