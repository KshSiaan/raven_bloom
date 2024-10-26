import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type innerInventorytype = {
  name: string; // Name of the product
  ammount: number; // Stock quantity available
  _id: string; // Unique identifier (MongoDB ID)
  price: number;
  description: string;
};

export default function Cartinfo({
  isClient,
  inventory,
  total,
  subtotal,
}: {
  isClient: boolean;
  inventory: innerInventorytype[];
  total: number;
  subtotal: number;
}) {
  return (
    <Card className="col-span-2 rounded-sm h-auto">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-xl uppercase">Cart Summary</CardTitle>
        <CardDescription>
          Review your selected items before proceeding to checkout.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-auto flex flex-col justify-start items-start border-b">
        {isClient && inventory && inventory.length > 0 ? (
          inventory.map((item, index) => (
            <div
              className="grid grid-cols-10 gap-4 w-full h-auto pt-6"
              key={index}
            >
              <div className="col-span-1 w-full h-full text-xl flex justify-start items-start">
                {item.ammount}
              </div>
              <div className="col-span-9 w-full h-full">
                <div className="w-full flex justify-between items-start font-semibold">
                  <span>{item.name}</span>
                  <span>${item.price}.00</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm pr-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">Your cart is empty</p>
        )}
        <div className="w-full border-b my-4" />
        <div className="w-full flex justify-between items-center text-md font-semibold py-2">
          <div className="">Subtotal({total}):</div>
          <div className="">${subtotal}.00</div>
        </div>

        <div className="w-full flex justify-between items-center text-md font-semibold py-2">
          <div className="">Est. Delivery and Setup</div>
          <div className="">.Included</div>
        </div>
        <div className="w-full flex justify-between items-center text-md font-semibold py-2">
          <div className="">Estimated Tax.</div>
          <div className="">--</div>
        </div>
        <div className="h-[30px] w-full" />
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center text-xl font-semibold pt-6">
          <div className="">Estimated Total:</div>
          <div className="text-green-500">${subtotal}.00</div>
        </div>
      </CardFooter>
    </Card>
  );
}
