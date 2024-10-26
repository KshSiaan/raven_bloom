"use client";
import React, { useEffect, useState } from "react";
import { useCheckout } from "../checkoutContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, CreditCard, Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { setStep, checkoutInfo } = useCheckout();
  const [infoDatas, setInfoDatas] = useState<Array<string>>();

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  console.log(checkoutInfo);

  useEffect(() => {
    setInfoDatas([
      `Your name: ${checkoutInfo.firstName} ${checkoutInfo.lastName}`,
      `Phone: ${checkoutInfo.phone}`,
      `Delivery Phone: ${checkoutInfo.del_phone}`,
      `Location Type: ${checkoutInfo.locationType}`,
      `Address: ${checkoutInfo.address}, ${checkoutInfo.city}, ${
        checkoutInfo.state
      }, ${checkoutInfo.zip ? checkoutInfo.zip + ", " : ""}${
        checkoutInfo.country
      }`,
      `${checkoutInfo.occasion ? "Occasion: " + checkoutInfo.occasion : ""}`,
      `${checkoutInfo.message ? "Message: " + checkoutInfo.message : ""}`,
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full grid grid-cols-3 gap-x-4 items-start auto-rows-auto gap-6">
      <h2 className="col-span-3 font-semibold text-3xl mb-6">Payment</h2>
      <div className="col-span-2 rounded-sm">
        <div className="w-full grid grid-cols-6 gap-6">
          <Card className="col-span-2 h-[140px]">
            <CardHeader>
              <CreditCard />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl">Credit Card</CardDescription>
            </CardContent>
          </Card>
          <Card className="col-span-2 h-[140px]">
            <CardHeader>
              <Banknote />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl">
                Cash on delivery
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="col-span-2 h-[140px]">
            <CardHeader>
              <Landmark />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl">Bank</CardDescription>
            </CardContent>
          </Card>
          <Input
            type="text"
            placeholder="0000 0000 0000 0000"
            className="col-span-6"
          />
          <div className="col-span-6">
            <div className="text-end">lol</div>
          </div>
          <div className="col-span-2">
            <Input type="number" placeholder="MM/YY" />
          </div>
          <div className="col-span-2">
            <Input type="number" placeholder="CVC" />
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="border rounded-md flex justify-center items-center">
              Visa
            </div>
            <div className="border rounded-md flex justify-center items-center">
              Mastercard
            </div>
            <div className="border rounded-md flex justify-center items-center">
              Stripe
            </div>
          </div>
          <div className="col-span-6 flex flex-row justify-end items-center">
            <InfoCircledIcon height={18} width={18} />{" "}
            <span className="pl-2 font-bold text-sm text-muted-foreground">
              Credit Card payment may take up to 24h
            </span>
          </div>
          <div className="col-span-6">
            <Checkbox id="saver" />
            <Label htmlFor="saver" className="pl-2 text-sm font-bold">
              Save payment details for future purchase
            </Label>
          </div>
        </div>
      </div>
      <Card className="col-span-1 rounded-sm shadow-md">
        <CardHeader>
          <CardTitle>Your informations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Your email: {checkoutInfo.email}</li>
          </ul>

          <h2 className="font-semibold text-lg mt-6 pb-3 border-b">
            Personal informations
          </h2>
          {infoDatas?.map((item, index) => (
            <InfoSlot word={item} key={index} />
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-muted-foreground block w-full">
            Re-check your information before proceeding further
          </p>
        </CardFooter>
      </Card>
      <div className="col-span-3 flex flex-row justify-center items-center py-6">
        <Button>Overview Order</Button>
      </div>
    </div>
  );
}

function InfoSlot({ word }: { word: string }) {
  return <div className="mt-4 text-muted-foreground text-sm">{word}</div>;
}
