"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
const loginSchema = z.object({
  email: z.string().email({ message: "Please use a valid email" }),
  password: z.string(),
});
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [, setCookie] = useCookies();
  const nav = useRouter();

  async function loginSubmit(values: z.infer<typeof loginSchema>) {
    const readyValue = { email: values.email, password: values.password };

    try {
      const call = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readyValue),
      });

      const response = await call.json();
      console.log(response);

      if (!call.ok) {
        // Assuming you have a reference to the form element
        form.setError("password", {
          type: "custom",
          message: response.message,
        });
        return;
      }
      // Handle successful login (redirect, set session data, etc.)

      console.log("Login successful!");
      console.log("token: ", response.token);

      setCookie("user", response.token, { maxAge: 7 * 24 * 60 * 60 });
      nav.replace("/");
      // ...
    } catch (error) {
      console.error("Error during login:", error);
      // Handle any network or other errors
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-12">
        <h1 className="mt-8 font-bold text-center text-2xl">
          Welcome back to RavenBloom
        </h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-full">
              <div className="h-full flex flex-row justify-start items-center space-x-4">
                <FormControl className="flex flex-col justify-center items-center">
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="h-full">
              <div className="h-full flex flex-row justify-start items-center space-x-4">
                <FormControl className="flex flex-col justify-center items-center">
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <div className="p-4 w-full flex justify-center items-center">
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </Form>
  );
}
