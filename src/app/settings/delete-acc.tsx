"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { decodeJwt } from "jose";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface DecryptedDataType {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  exp: number;
}

export default function DeleteAccount() {
  const [cookies, , removeCookie] = useCookies(["user"]);
  const nav = useRouter();
  async function deleteAcc() {
    const token = cookies.user;
    const decryptedData = decodeJwt(token) as DecryptedDataType;

    if (decryptedData) {
      const { id } = decryptedData;
      const call = await fetch("http://localhost:3000/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const response = await call.json();

      if (!call.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
      removeCookie("user");
      nav.replace("/");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground"
                onClick={() => {
                  deleteAcc();
                }}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
