"use client";
import React, { useEffect } from "react";
import { useCheckout } from "../../checkoutContext";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { setStep } = useCheckout();

  useEffect(() => {
    setStep(3);
  }, [setStep]);

  return (
    <div className="w-full h-dvh">
      <Button>Confirm your order</Button>
    </div>
  );
}
