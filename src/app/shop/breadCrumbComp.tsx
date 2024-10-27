"use client";
import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export default function BreadcrumbComponent() {
  const [pathArray, setPathArray] = useState<Array<string>>([]);
  const pathName = usePathname();

  useEffect(() => {
    const arrayedPath = pathName.split("/");
    arrayedPath.shift();
    setPathArray(arrayedPath);
  }, [pathName]);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathArray.map((item, index) => {
          const path = "/" + pathArray.slice(0, index + 1).join("/");

          return pathArray.length - 1 === index ? (
            <BreadcrumbItem className="capitalize" key={index}>
              {item}
            </BreadcrumbItem>
          ) : (
            <React.Fragment key={index}>
              <BreadcrumbItem className="capitalize">
                <BreadcrumbLink href={path}>{item}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
