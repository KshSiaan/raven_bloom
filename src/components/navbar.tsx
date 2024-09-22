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
import { ShoppingCart } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="h-[48px] w-full grid grid-cols-3 justify-center items-center px-2 absolute top-0 left-0">
      <div className="font-sans font-bold text-sm w-auto">
        <Image src="/logo_dark.png" width="48" height="48" alt="logo" />
      </div>
      <div className="">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            {navbarItems.map((item, index) =>
              item.hasChild ? (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="grid gap-3 p-6 lg:w-[400px]">
                    <div className="w-[200px] h-[100%]"></div>
                    <div className="w-[200px]">
                      {item.child?.map((item, index) => (
                        <NavigationMenuLink
                          key={index + 100}
                          className={index == 0 ? "px-4 py-1" : "px-4 pb-1"}
                        >
                          {item.title}
                        </NavigationMenuLink>
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
        <div className="relative cursor-pointer hover:scale-110 transition duration-300">
          <ShoppingCart />
          <div className="ammount absolute -bottom-1 -left-1 rounded-full text-sm font-bold bg-card-foreground text-background h-5 w-5 p-0 aspect-square flex flex-wrap justify-center items-center">
            1
          </div>
        </div>

        <ModeToggle />
        {/* <Sheet>
          <SheetTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Guest</SheetTitle>
              <SheetDescription>
                <div className="p-2 w-full flex flex-row flex-wrap justify-around items-center"></div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet> */}

        <div className="px-2 flex flex-row justify-around items-center space-x-8 font-bold text-sm text-zinc-800 dark:text-zinc-200">
          <Link href="/login">Login</Link>
          <Link href="/login">Sign Up</Link>
        </div>
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
    child: [{ title: "Gallary" }, { title: "Blog" }],
  },
  { title: "About us", link: "/about", hasChild: false },
  { title: "Contact us", link: "/contact", hasChild: false },
];
