import Navbar from "@/components/navbar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function page() {
  return (
    <>
      <header className="pt-[48px]">
        <Navbar />
        <div className="h-[124px] w-full border-b flex flex-col justify-center items-center px-[10%] font-medium">
          Welcome to RavenBloom, where nature&apos;s beauty comes alive.
        </div>

        <div className="p-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="p-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Relative</SelectItem>
              <SelectItem value="dark">Lowest price</SelectItem>
              <SelectItem value="system">Highest price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
    </>
  );
}


