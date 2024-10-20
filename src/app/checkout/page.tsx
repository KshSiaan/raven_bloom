"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";

export default function Page() {
  const inventory = useAppSelector((state) => state.inventory.inventory);
  const [isClient, setIsClient] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
    const totalAmount = inventory.reduce(
      (acc, element) => acc + element.ammount,
      0
    );
    setTotal(totalAmount);

    //subtotal amount

    const subTotalVar = inventory.reduce(
      (acc, element) => acc + element.price,
      0
    );
    setSubtotal(subTotalVar);
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
          <div className="w-full flex justify-between items-center text-md font-semibold py-2">
            <div className="">Estimated Total:</div>
            <div className="">${subtotal}.00</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
