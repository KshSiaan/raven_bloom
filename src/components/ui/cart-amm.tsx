"use client";
import { useAppSelector } from "@/hooks/redux-hooks";
import React from "react";

export default function CartAmm() {
  const inventory = useAppSelector((state) => state.inventory.inventory);
  if (inventory.length === 0) {
    return "";
  } else {
    return (
      <div className="ammount absolute -bottom-1 -left-1 rounded-full text-sm font-bold bg-card-foreground text-background h-5 w-5 p-0 aspect-square flex flex-wrap justify-center items-center">
        {inventory.length}
      </div>
    );
  }
}
