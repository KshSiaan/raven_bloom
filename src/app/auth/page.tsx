"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import Register from "./register";
import verifySession from "@/lib/sessions";
import { usePathname } from "next/navigation";

export default function Page() {
  const path = usePathname();
  verifySession(path);

  return (
    <>
      <nav className="h-[48px] w-dvw fixed top-0 left-0 border-b">
        <div className="font-sans font-bold text-sm w-auto">
          <Image src="/logo_dark.png" width="48" height="48" alt="logo" />
        </div>
      </nav>

      <div className="h-dvh w-dvh flex justify-center items-center">
        <Tabs defaultValue="login" className="w-1/3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="register">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
