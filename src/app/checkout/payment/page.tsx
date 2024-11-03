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

type PaymentMethod = "credit" | "cash" | "bank";

export default function Page() {
  const { setStep, checkoutInfo } = useCheckout();
  const [infoDatas, setInfoDatas] = useState<Array<string>>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("credit");

  useEffect(() => {
    setStep(1);
  }, [setStep]);

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
  }, [checkoutInfo]);

  const PaymentCard = ({
    method,
    title,
    icon: Icon,
  }: {
    method: PaymentMethod;
    title: string;
    icon: React.ElementType;
  }) => (
    <Card
      className={`col-span-1 h-[140px] cursor-pointer transition-all duration-300 ${
        selectedMethod === method
          ? "shadow-lg transform -translate-y-1 bg-zinc-900"
          : ""
      }`}
      onClick={() => setSelectedMethod(method)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setSelectedMethod(method);
        }
      }}
      role="radio"
      aria-checked={selectedMethod === method}
    >
      <CardHeader>
        <Icon />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xl">{title}</CardDescription>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 items-start auto-rows-auto gap-6">
      <h2 className="col-span-full font-semibold text-3xl mb-6">Payment</h2>
      <div className="col-span-full md:col-span-2 rounded-sm">
        <div className="w-full grid grid-cols-3 gap-6">
          <PaymentCard method="credit" title="Credit Card" icon={CreditCard} />
          <PaymentCard method="cash" title="Cash on delivery" icon={Banknote} />
          <PaymentCard method="bank" title="Bank" icon={Landmark} />

          {selectedMethod === "credit" && (
            <>
              <Input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="col-span-full"
                aria-label="Card number"
              />
              <div className="col-span-full">
                <div className="text-end text-sm text-muted-foreground">
                  Enter your 16-digit card number
                </div>
              </div>
              <div className="col-span-1">
                <Input
                  type="text"
                  placeholder="MM/YY"
                  aria-label="Expiry date"
                />
              </div>
              <div className="col-span-1">
                <Input type="text" placeholder="CVC" aria-label="CVC" />
              </div>
              <div className="col-span-1 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div className="border rounded-md flex justify-center items-center p-2">
                  Visa
                </div>
                <div className="border rounded-md flex justify-center items-center p-2">
                  Mastercard
                </div>
                <div className="border rounded-md flex justify-center items-center p-2">
                  Stripe
                </div>
              </div>
              <div className="col-span-full flex flex-row justify-end items-center">
                <InfoCircledIcon className="h-4 w-4" />
                <span className="pl-2 font-bold text-sm text-muted-foreground">
                  Credit Card payment may take up to 24h
                </span>
              </div>
              <div className="col-span-full flex items-center space-x-2">
                <Checkbox id="saver" />
                <Label htmlFor="saver" className="text-sm font-bold">
                  Save payment details for future purchase
                </Label>
              </div>
            </>
          )}

          {selectedMethod === "cash" && (
            <div className="col-span-full text-muted-foreground">
              <p>
                You will pay in cash upon delivery. Please ensure you have the
                exact amount ready.
              </p>
            </div>
          )}

          {selectedMethod === "bank" && (
            <>
              <Input
                type="text"
                placeholder="Bank Name"
                className="col-span-full"
                aria-label="Bank Name"
              />
              <Input
                type="text"
                placeholder="Account Number"
                className="col-span-full"
                aria-label="Account Number"
              />
              <Input
                type="text"
                placeholder="SWIFT/BIC Code"
                className="col-span-full"
                aria-label="SWIFT/BIC Code"
              />
            </>
          )}
        </div>
      </div>
      <Card className="col-span-full md:col-span-1 rounded-sm shadow-md">
        <CardHeader>
          <CardTitle>Your information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your email: {checkoutInfo.email}</p>

          <h2 className="font-semibold text-lg mt-6 pb-3 border-b">
            Personal information
          </h2>
          {infoDatas.map((item, index) => (
            <InfoSlot word={item} key={index} />
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-muted-foreground block w-full">
            Re-check your information before proceeding further
          </p>
        </CardFooter>
      </Card>
      <div className="col-span-full flex flex-row justify-center items-center py-6">
        <Button>Overview Order</Button>
      </div>
    </div>
  );
}

function InfoSlot({ word }: { word: string }) {
  return <div className="mt-4 text-muted-foreground text-sm">{word}</div>;
}
