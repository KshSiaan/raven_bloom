"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import { toast } from "@/hooks/use-toast";
interface DecryptedDataType {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  exp: number;
}
const formSchema = z
  .object({
    currentPass: z.string({ required_error: "Current password is required." }),
    newPass: z
      .string({ required_error: "New password is required." })
      .min(8, "Password must be at least 8 characters long."),
    confirmPass: z.string({
      required_error: "Please confirm your new password.",
    }),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ChangePass() {
  const [cookies] = useCookies(["user"]);
  const nav = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  async function onSubmit(data: FormValues) {
    const token = cookies.user;
    const decryptedData = decodeJwt(token) as DecryptedDataType;

    if (decryptedData) {
      const { id } = decryptedData;
      const call = await fetch("http://localhost:3000/api/updatePassword", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id }),
      });
      const response = await call.json();

      if (!call.ok) {
        form.setError("confirmPass", {
          type: "custom",
          message: response.message,
        });
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }

      toast({
        title: "Success",
        description: response.message,
      });
      form.reset();
    } else {
      nav.replace("/");
      return;
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and connected devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentPass"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="currentPass">Current Password</Label>
                  <FormControl>
                    <Input type="password" id="currentPass" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPass"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="newPass">New Password</Label>
                  <FormControl>
                    <Input type="password" id="newPass" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirmPass">Confirm Password</Label>
                  <FormControl>
                    <Input type="password" id="confirmPass" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              Update Password
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
