import type { Metadata } from "next";
import SideNav from "@/components/ui/sidenav";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topnav from "@/components/ui/topnav";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "RB || Dashboard",
  description: "Your Favourite flowershop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-dvh w-dvw flex flex-row flex-wrap justify-between items-start">
        <SideNav />
        <div className="w-[96%] h-full bg-zinc-200 dark:bg-zinc-900">
          <Topnav />
          <div className="p-4 w-full h-[calc(100%-64px)]">
            <ScrollArea className="h-full w-full ">{children}</ScrollArea>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
