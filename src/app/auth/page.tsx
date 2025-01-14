import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login";
import Register from "./register";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardBody } from "@/components/ui/3d-card";

export default function Page() {
  return (
    <>
      <nav className="h-[48px] w-dvw fixed top-0 left-0 border-b">
        <div className="font-sans font-bold text-sm w-auto">
          <Image src="/logo_dark.png" width="48" height="48" alt="logo" />
        </div>
      </nav>
      <Card className="absolute bottom-4 left-4">
        <CardHeader>
          <CardTitle className="text-center">
            Login datas for project showcase
          </CardTitle>
        </CardHeader>
        <CardBody className="h-min py-4 px-8">
          <CardDescription>
            Admin login data <br />
            email:admin@admin.com <br />
            pass:test1234
          </CardDescription>
        </CardBody>
      </Card>
      <div className="h-dvh w-dvh flex justify-center items-center">
        <Tabs defaultValue="login" className="w-[90%] sm:w-1/2 md:w-1/3">
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
