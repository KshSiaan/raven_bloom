"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [userAmm, setUserAmm] = useState<number>(0);
  const [productAmm, setProductAmm] = useState<number>(0);
  const pageData = [
    {
      name: "Available Products",
      value: productAmm,
      link: ["Check Products", "/admin/products"],
    },
    {
      name: "Total Users",
      value: userAmm,
      link: ["Check Users", "/admin/users"],
    },
    {
      name: "Pending Orders",
      value: 0,
      link: ["Check Orders", "/admin/orders"],
    },
    {
      name: "Completed Orders this month",
      value: 0,
      link: ["Check Orders", "/admin/orders"],
    },
  ];

  async function putData() {
    try {
      const call = await fetch("http://localhost:3000/api/countdb");
      const res = await call.json(); 

      if (!call.ok) {
        console.error("Error: ", res.error);
      }
      console.log("Success: ", res);
      setUserAmm(res.userAmm);
      setProductAmm(res.productAmm);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }

  useEffect(() => {
    putData();
  }, []);

  return (
    <>
      <div className="my-4 p-4 grid grid-cols-4 gap-4">
        {pageData.map((item, index) => (
          <Card
            key={index}
            className="w-full h-[200px] bg-background hover:shadow-md hover:shadow-black transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-xl">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-bold text-4xl">{item.value}</span>
            </CardContent>
            <CardFooter>
              <Link href={item.link[1]} className="underline font-semibold">
                {item.link[0]}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-background h-[300px] w-full"></div>
        <div className="bg-background h-[300px] w-full"></div>
        <div className="bg-background h-[300px] w-full"></div>
        <div className="bg-background h-[300px] w-full"></div>
      </div>
    </>
  );
}
