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

const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, { message: "The name seems too short" })
      .max(20, { message: "PLease use a shorter name" }),
    email: z.string().email({ message: "Please use a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    path: ["repassword"],
    message: "Password doesn't not match",
  });
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  function registerSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(registerSubmit)} className="space-y-12">
        <h1 className="mt-8 font-bold text-center text-2xl">
          Create an account
        </h1>

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="h-full">
              <div className="h-full flex flex-row justify-start items-center space-x-4">
                <FormControl className="flex flex-col justify-center items-center">
                  <Input placeholder="Full name" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
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

        <FormField
          control={form.control}
          name="repassword"
          render={({ field }) => (
            <FormItem className="h-full">
              <div className="h-full flex flex-row justify-start items-center space-x-4">
                <FormControl className="flex flex-col justify-center items-center">
                  <Input placeholder="Re-type Password" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <div className="p-4 w-full flex justify-center items-center">
          <Button type="submit">Sign up</Button>
        </div>
      </form>
    </Form>
  );
}
