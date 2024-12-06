"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonView from "./skeletonview";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  change,
  clearItem,
  pushItem,
} from "@/features/inventory/inventorySlice";

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

  const [buyAmm, setBuyAmm] = useState<number>(0);
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.inventory.inventory);

  useEffect(() => {
    const updateData = async () => {
      await putData(); // Ensure putData completes before continuing
    };

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const updateData = async () => {
      await putData(); // Ensure putData completes before continuing
    };

    updateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Now depends on cart to trigger logic when cart changes

  useEffect(() => {
    if (
      inventory.length > 0 &&
      res?.product?.name && // Check if product name exists
      inventory.some((item) => item.name === res.product.name)
    ) {
      const itemName = res.product.name;
      const index = inventory.findIndex((item) => item.name === itemName);
      if (index !== -1) {
        setBuyAmm(inventory[index].ammount);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res, inventory]);

  async function putData() {
    const call = await fetch(`${window.location.origin}/api/getproduct`, {
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

  function addToCart() {
    const itemName = res?.product.name;
    const exists = inventory.some((item) => item.name === itemName);

    if (exists) {
      const index = inventory.findIndex((item) => item.name === itemName);
      const preparedChange = { index: index, amm: buyAmm };

      if (buyAmm === 0) {
        dispatch(clearItem(index));
      } else {
        dispatch(change(preparedChange));
      }
    } else {
      const preparedItem = {
        name: res?.product.name, // Name of the product
        ammount: buyAmm, // Ammount quantity available
        price: res?.product.price,
        _id: res?.product._id, // Unique identifier (MongoDB ID)
        description: res?.product.desc,
      };

      dispatch(pushItem(preparedItem));
    }
  }

  function increaseBuy() {
    setBuyAmm((prev) => prev + 1);
  }
  function decreaseBuy() {
    setBuyAmm((prev) => prev - 1);
  }

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
            loading="lazy"
          />
        </div>
        <div className="w-50% text-right">
          <h1 className="text-4xl font-semibold py-4 break-words whitespace-normal">
            {res?.product.name}
          </h1>
          <h2 className="text-4xl font-bold p-4 text-green-500">
            ${res?.product.price}
          </h2>
          {res?.product.stock === 0 ? (
            <div className="py-4 text-red-500 font-bold text-md">
              Out of stock
            </div>
          ) : (
            <div className="py-4 text-amber-500 font-bold text-md">
              Available: {(res?.product.stock || 0) - buyAmm}{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                (of {res?.product.stock} total)
              </span>
            </div>
          )}
          <div className="text-xl flex flex-row flex-wrap justify-end gap-x-2">
            Ammount:{" "}
            <div className="w-[30px] h-[30px] border rounded-md flex flex-wrap justify-center items-center">
              {buyAmm}
            </div>
          </div>
          <div className="w-full flex flex-row justify-end items-center">
            <div className="flex flex-row justify-end items-center gap-4 pt-4">
              <Button
                size="icon"
                onClick={() => {
                  increaseBuy();
                }}
              >
                <PlusIcon size={18} />
              </Button>
              <Button
                className="hover:bg-green-500"
                variant="default"
                onClick={() => {
                  addToCart();
                }}
              >
                Add to cart
              </Button>
              <Button
                size="icon"
                onClick={() => {
                  decreaseBuy();
                }}
              >
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
        <p className="py-4 text-md font-light">{res?.product.desc}</p>
      </div>
    </div>
  );
}
