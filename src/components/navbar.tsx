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

export default function Navbar() {
  return (
    <nav className="h-[48px] w-full flex flex-row flex-wrap justify-between items-center px-2 absolute top-0 left-0">
      <div className="font-sans font-bold text-sm">
        <Image src="/logo_dark.png" width="48" height="48" alt="logo" />
      </div>
      <div className="">
        <NavigationMenu>
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
                  <Link href="/" className="text-sm font-medium leading-none">
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
}

const navbarItems = [
  { title: "Shop", hasChild: false },
  { title: "Gallary", hasChild: false },
  {
    title: "Services",
    hasChild: true,
    child: [{ title: "Gallary" }, { title: "Blog" }],
  },
  { title: "About us", hasChild: false },
  { title: "Contact us", hasChild: false },
];
