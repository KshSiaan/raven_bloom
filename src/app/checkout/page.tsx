"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
// import Image from "next/image";

export default function Page() {
  const inventory = useAppSelector((state) => state.inventory.inventory);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-cols-6 gap-x-4">
      <div className="col-span-4 h-dvh w-full border rounded-sm"></div>
      <Card className="col-span-2 rounded-sm">
        <CardHeader className="border-b pb-4">

            <CardTitle className="text-xl uppercase">Cart Summary</CardTitle>
          <CardDescription>
            Review your selected items before proceeding to checkout.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full h-full py-6 flex flex-col justify-start items-start gap-y-6">
          {isClient && inventory && inventory.length > 0 ? (
            inventory.map((item, index) => (
              <div
                className="grid grid-cols-10 gap-4 w-full h-full"
                key={index}
              >
                <div className="col-span-1 w-full h-full text-xl flex justify-start items-start">
                  {item.ammount}
                </div>
                <div className="col-span-9 w-full h-full">
                  <div className="w-full flex justify-between items-start font-semibold">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                  <p className="text-zinc-400 text-sm pr-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum sequi quod odio, earum iste culpa voluptate! Facere
                    reiciendis asperiores, deserunt, eius excepturi ex
                    molestias, sequi et commodi maiores quaerat animi.
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-500">Your cart is empty</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
