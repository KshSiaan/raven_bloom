"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonView from "./skeletonview";

interface resType {
  product: {
    categories: boolean[]; // Array of booleans representing category states
    desc: string; // Description of the product
    image: string; // Image filename or URL
    name: string; // Name of the product
    price: number; // Price of the product
    stock: number; // Stock quantity available
    tags: string[]; // Array of tags associated with the product
    __v: number; // Version number (used in MongoDB schema)
    _id: string; // Unique identifier (MongoDB ID)
  };
}

export default function Page({ params }: { params: { product: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [res, setRes] = useState<resType>();

  async function putData() {
    const call = await fetch("http://localhost:3000/api/getproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: params.product,
      }),
    });
    const res = await call.json();
    setRes(res);
    setLoading(false);
  }
  useEffect(() => {
    putData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <SkeletonView />;
  }

  return (
    <div className="h-auto w-full px-[6%]">
      <div className="w-full h-auto flex flex-wrap flex-row justify-between items-start">
        <div className="w-[50%] h-auto">
          <Image
            src="/productImgs/dummy_img.webp"
            width={400}
            height={400}
            className="rounded-lg"
            alt="thumbnail"
          />
        </div>
        <div className="w-50% text-right">
          <h1 className="text-4xl font-semibold py-4">{res?.product.name}</h1>
          <h2 className="text-4xl font-bold p-4 text-green-500">
            ${res?.product.price}
          </h2>
          <p className="text-xl flex flex-row flex-wrap justify-end gap-x-2">
            Ammount:{" "}
            <div className="w-[30px] h-[30px] border rounded-md flex flex-wrap justify-center items-center">
              0
            </div>
          </p>
          <div className="w-full flex flex-row justify-end items-center">
            <div className="flex flex-row justify-end items-center gap-4 pt-4">
              <Button size="icon">
                <PlusIcon size={18} />
              </Button>
              <Button className="hover:bg-green-500" variant="default">
                Add to cart
              </Button>
              <Button size="icon">
                <MinusIcon size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border w-2/3 my-4 p-4 rounded-lg">
        <h4 className="py-2 text-2xl font-semibold border-b">
          Product Details
        </h4>
        <p className="py-4 text-xl font-light">{res?.product.desc}</p>
      </div>
    </div>
  );
}
