export const dynamic = "force-dynamic";
import ProfileNavbar from "@/components/profile-navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { decodeJwt } from "jose";

export default async function Page() {
  function getJWT(): string {
    try {
      const userCookie = cookies().get("user");
      if (userCookie && userCookie.value) {
        return userCookie.value;
      } else {
        throw new Error("User cookie is undefined");
      }
    } catch (error) {
      console.log(error);
      redirect("/");
    }
  }
  const token = getJWT();

  interface decryptedDatatype {
    id: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
    exp: number;
  }
  const decryptedData: decryptedDatatype = decodeJwt(token);

  async function getUser(id: string) {
    const call = await fetch("http://localhost:3000/api/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: id }),
    });

    const res = await call.json();

    if (!call.ok) {
      console.log(res.error);
      return;
    }
    return res;
  }
  interface userType {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    isAdmin: boolean;
    newsletter: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  const user: userType = await getUser(decryptedData.id);

  return (
    <>
      <header>
        <ProfileNavbar />
      </header>
      <main>
        <div className="bg-background">
          <div className="w-full">
            {/* Banner */}
            <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              {/* Profile Picture */}
              <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                <Avatar className="w-40 h-40 border-4 border-background">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Profile Information */}
            <div className="mt-24 px-8 py-6 bg-background">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {user.fullName}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {user.isAdmin ? "Admin" : "Customer"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center  text-muted-foreground">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center  text-muted-foreground">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>
                    {user.phoneNumber == "00"
                      ? "Phone number is not assigned yet"
                      : user.phoneNumber}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">
                  About
                </h2>
                <p className="text-muted-foreground">Blehhh..</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
