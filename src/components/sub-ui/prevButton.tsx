"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrevButton() {
  const route = useRouter();

  function prevHandle() {
    route.back();
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        prevHandle();
      }}
    >
      <ArrowLeft />
    </Button>
  );
}
