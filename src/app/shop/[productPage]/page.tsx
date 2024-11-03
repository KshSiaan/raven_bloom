"use client";
import { Card, CardContent } from "@/components/ui/card";
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
  const [defData, setDefData] = useState<Array<prodObj>>([]);

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
    setDefData(res.data);
  }
  useEffect(() => {
    getDatas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

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

  function filterSort(val: string) {
    if (val === "lowest") {
      setProducts([...products].slice().sort((a, b) => a.price - b.price));
    } else if (val === "highest") {
      setProducts([...products].slice().sort((a, b) => b.price - a.price));
    } else {
      setProducts(defData);
    }
  }

  return (
    <>
      <div className="p-4">
        <Select
          onValueChange={(value) => {
            filterSort(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Relative</SelectItem>
            <SelectItem value="lowest">Lowest price</SelectItem>
            <SelectItem value="highest">Highest price</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          : products.map((item) => (
              <Card
                key={item._id}
                className="group relative h-[250px] md:h-[400px] w-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => router.push(`${params.productPage}/${item._id}`)}
              >
                <div className="absolute bg-background duration-300" />
                <Image
                  src="/productImgs/dummy_img.webp"
                  className="h-[150px] md:h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={500}
                  height={500}
                  alt={item.name}
                />
                <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-lg md:text-xl text-zinc-800 dark:text-zinc-200  transition-colors duration-300 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="absolute bg-background bottom-4 right-4 text-sm sm:text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
                    ${item.price.toFixed(2)}
                  </p>
                </CardContent>
                <span className="sr-only">View details for {item.name}</span>
              </Card>
            ))}
      </div>
    </>
  );
}
