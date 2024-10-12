"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
interface prodObj {
  categories: boolean[]; // Array of booleans representing category states
  desc: string; // Description of the product
  image: string; // Image filename or URL
  name: string; // Name of the product
  price: number; // Price of the product
  stock: number; // Stock quantity available
  tags: string[]; // Array of tags associated with the product
  __v: number; // Version number (used in MongoDB schema)
  _id: string; // Unique identifier (MongoDB ID)
}
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page({ params }: { params: { productPage: string } }) {
  const [products, setProducts] = useState<Array<prodObj>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getDatas() {
    const call = await fetch("http://localhost:3000/api/allproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: params.productPage,
      }),
    });
    const res = await call.json();
    setProducts(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getDatas();
  }, []);

  const router = useRouter();

  const pagePossibles = [
    "fall",
    "flowers",
    "plants",
    "bouquets",
    "gifts",
    "equipments",
  ];
  if (!pagePossibles.includes(params.productPage)) {
    notFound();
  }

  const skeletonItems = Array(4).fill(0);

  return (
    <>
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
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {loading
          ? skeletonItems.map((_, index) => (
              <div
                className="h-[400px] w-full flex flex-col space-y-3"
                key={index}
              >
                <Skeleton className="h-[300px] w-[full]" />
                <Skeleton className="h-[30px] w-[full]" />
                <Skeleton className="h-[30px] w-[80%]" />
              </div>
            ))
          : products.map((item, index) => (
              <Card
                key={index}
                className="h-[400px] w-full overflow-hidden cursor-pointer hover:scale-105 transition-transform hover:bg-zinc-200 dark:hover:bg-zinc-900"
                onClick={() => {
                  router.push(params.productPage + "/" + item._id);
                }}
              >
                <Image
                  src="/productImgs/dummy_img.webp"
                  className="h-[300px] w-[full] object-cover"
                  width={500}
                  height={500}
                  alt="thumbnail"
                />
                <div className="title font-semibold p-4 text-xl">
                  {item.name}
                </div>
                <div className="text-end p-4 font-bold hover:text-green-500">
                  ${item.price}
                </div>
              </Card>
            ))}
      </div>
    </>
  );
}
