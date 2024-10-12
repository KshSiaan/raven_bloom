"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonView() {
  return (
    <div className="w-full px-[6%] h-auto flex flex-wrap flex-row justify-between items-start">
      <div className="w-[50%] h-auto">
        <Skeleton className="h-[400px] w-[400px]" />
      </div>
      <div className="w-[50%] flex flex-col flex-wrap justify-start items-end gap-y-12">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-14 w-[42%]" />
      </div>
      <Skeleton className="h-[20dvh] w-2/3 mt-4" />
    </div>
  );
}
