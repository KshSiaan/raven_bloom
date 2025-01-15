"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenIcon, Search, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddItemModal from "./additemmodal";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
export default function Page() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  interface productDataType {
    _id: string;
    image: string;
    name: string;
    price: number;
    stock: number;
    tags: Array<string>;
  }
  const [productData, setProductData] = useState<Array<productDataType>>([]);

  useEffect(() => {
    putProducts();
  }, []);

  async function putProducts() {
    setIsLoading(true);
    const call = await fetch(`${window.location.origin}/api/allproducts`);
    const res = await call.json();
    setProductData(res.data);
    setIsLoading(false);
  }

  async function deleteProduct(id: string) {
    fetch(`${window.location.origin}/api/product`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast({
          description: data.message,
        });
        setIsLoading(true);
        putProducts();
      })
      .catch((error) => {
        toast({
          description: error,
        });
      });
  }

  return (
    <>
      <div className="w-full flex flex-row flex-wrap justify-between items-center mb-4">
        <div className="relative rounded-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Find Products"
            className="pl-10 w-full bg-zinc-800 text-zinc-100 border-zinc-700 placeholder-zinc-500"
          />
        </div>
        <Button
          className=""
          onClick={() => {
            setModalShow(true);
          }}
        >
          Add Item
        </Button>
      </div>

      {/* Add Item modal */}

      <AddItemModal
        active={modalShow}
        setModalShow={setModalShow}
        putProducts={putProducts}
      />

      <div className="w-full p-4 bg-background rounded-lg border-b shadow-sm shadow-black flex flex-row justify-center items-center">
        <Table>
          <TableCaption>List of the users in RavenBloom</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Image</TableHead>
              <TableHead>Product name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="w-full p-4 flex flex-row justify-center items-center ">
                    Loading..
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              productData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    <Image
                      src={"/productImgs/" + item.image}
                      width={24}
                      height={24}
                      alt="thumbnail"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.tags.join(",")}</TableCell>
                  <TableCell>
                    <PenIcon
                      color="teal"
                      onClick={() => {
                        toast({
                          title: "Uh oh! Something went wrong.",
                          description: "There was a problem with your request.",
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Trash2Icon
                      color="firebrick"
                      className="cursor-pointer"
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* <Toaster /> */}
    </>
  );
}
