"use client";
import React from "react";
// import CartAmm from "@/components/ui/cart-amm";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart, TrashIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { clearAll, clearItem } from "@/features/inventory/inventorySlice";
import dynamic from "next/dynamic";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function ShopCartDrawer() {
  const inventory = useAppSelector((state) => state.inventory.inventory);
  const nav = useRouter();
  const CartAmm = dynamic(() => import("@/components/ui/cart-amm"), {
    ssr: false,
  });
  return (
    <Drawer>
      <DrawerTrigger className="relative flex items-center">
        <ShoppingCart />
        <span className="ml-2">
          <CartAmm />
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row flex-wrap justify-between items-center">
          <div className="">
            {inventory.length > 0 ? <ClearInventory /> : ""}
          </div>
          <div className="text-2xl font-semibold">Cart Inventory</div>
          <div className="">
            {inventory.length > 0 ? (
              <Button
                className="hover:bg-green-600"
                onClick={() => {
                  nav.replace("/checkout");
                }}
              >
                Checkout
              </Button>
            ) : (
              ""
            )}
          </div>
        </DrawerHeader>
        <div className="h-[50dvh] w-full">
          {inventory.length > 0 ? (
            <ShopCartInventory />
          ) : (
            <div className="w-full h-full flex flex-wrap justify-center items-center">
              <h3 className="p-4 border-dashed border-2 rounded-lg">
                Your cart is currently empty. Add items to view them here.
              </h3>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function ClearInventory() {
  const dispatch = useAppDispatch();

  function clearCart() {
    dispatch(clearAll());
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="hover:bg-red-600" variant="outline">
          Clear cart
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will remove all of the items in
            the cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-foreground"
            onClick={() => {
              clearCart();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ShopCartInventory() {
  const inventory = useAppSelector((state) => state.inventory.inventory);
  const dispatch = useAppDispatch();
  return (
    <ScrollArea className="h-full w-full flex flex-col justify-start items-center p-4">
      {inventory.map((item, index) => (
        <div
          className="border h-full w-full rounded-lg p-4 flex flex-row justify-between items-center mb-4"
          key={index}
        >
          <div className="h-full flex flex-row justify-start items-start gap-x-6">
            <Image
              height="48"
              width="48"
              src="/productImgs/dummy_img.webp"
              alt="thumbnail"
            />
            <div className="h-auto">
              <h4 className="text-xl font-bold">
                {item.ammount} of {item.name}
              </h4>
              <p className="text-md font-light">
                {item.price * item.ammount}$ per {item.price}$
              </p>
            </div>
          </div>

          <div className="">
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-red-600"
              onClick={() => {
                dispatch(clearItem(index));
              }}
            >
              <TrashIcon size={18} />
            </Button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
