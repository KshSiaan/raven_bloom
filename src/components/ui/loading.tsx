import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="py-8 w-full flex flex-row justify-center items-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
