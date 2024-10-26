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

import { cookies } from "next/headers";
import ShopCartDrawer from "./sub-ui/shopcartdrawer";

export default async function Navbar() {
  function getName(): string {
    const userCookie = cookies().get("user");

    if (userCookie) {
      const token: string | undefined = userCookie.value;
      if (token) {
        const decodedToken = decodeJwt(token) as { fullName?: string };
        return decodedToken.fullName ?? "Guest"; // Defaults to "Guest" if fullName is undefined
      } else {
        console.log("Token is undefined");
      }
    }

    return "Guest";
  }

  const name: string = getName();
  const auth: boolean = !!cookies().get("user");

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
            <SheetTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{name}</SheetTitle>
                <SheetDescription>
                  <div className="p-2 w-full flex flex-row flex-wrap justify-around items-center">
                    lol
                  </div>
                </SheetDescription>
              </SheetHeader>
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
