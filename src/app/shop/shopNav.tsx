"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";

export default function ShopNav() {
  const pathName = usePathname();

  return pathName == "/shop" ? (
    <div className="w-full py-4 border-b flex flex-row flex-wrap justify-around items-center">
      {shopLinks.map((item, index) => (
        <Link key={index} href={item.link}>
          <Button variant="link">{item.name}</Button>
        </Link>
      ))}
    </div>
  ) : (
    ""
  );
}

const shopLinks = [
  {
    name: "Fall Collection",
    link: "/shop/fall",
  },
  {
    name: "Flowers",
    link: "/shop/flowers",
  },
  {
    name: "Plants",
    link: "/shop/plants",
  },
  {
    name: "Bouquets",
    link: "/shop/bouquets",
  },
  {
    name: "Gifts",
    link: "/shop/gifts",
  },
  {
    name: "Equipments",
    link: "/shop/equipments",
  },
];
