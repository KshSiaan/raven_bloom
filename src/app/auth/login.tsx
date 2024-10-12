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

const loginSchema = z.object({
  email: z.string().email({ message: "Please use a valid email" }),
  password: z.string(),
});
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

      if (!response.success) {
        // Assuming you have a reference to the form element
        form.setError("password", {
          type: "custom",
          message: response.message,
        });
      } else {
        // Handle successful login (redirect, set session data, etc.)
        console.log("Login successful!");
        // ...
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle any network or other errors
    } finally {
      // Update loading state if applicable
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
                  <Input placeholder="Password" {...field} />
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
