"use client";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import Draggable from "react-draggable";

interface AddItemModalProps {
  active: boolean;
  setModalShow: (value: boolean) => void;
  putProducts: () => Promise<void>;
}

export default function AddItemModal({
  active,
  setModalShow,
  putProducts,
}: AddItemModalProps) {
  const [dataChecked, setDataChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function checkDatas() {
    if (dataChecked) {
      return;
    }

    if (productName.length == 0) {
      setErrorMessage("Please put the name of the product");
      return;
    } else if (productPrice.length == 0) {
      setErrorMessage("Please put the price of the product");
      return;
    } else if (Number.isNaN(parseInt(productPrice))) {
      setErrorMessage("Please put a Numeric input of the price");
      return;
    } else if (productStock.length == 0) {
      setErrorMessage("Please put the price of the stock ammount");
      return;
    } else if (Number.isNaN(parseInt(productStock))) {
      setErrorMessage("Please put a Numeric input of the stock ammount");
      return;
    } else if (Number.isNaN(parseInt(productStock))) {
      setErrorMessage("Please put a Numeric input of the stock ammount");
      return;
    } else if (productTags.length <= 1) {
      setErrorMessage("Please put at least one tag");
      return;
    } else if (productDescription.length == 0) {
      setErrorMessage("Product Description cant be empty");
      return;
    } else if (!productCatagories.includes(true)) {
      setErrorMessage("Select at least one category");
      return;
    } else if (file.length == 0) {
      setErrorMessage("PLease use an image to proceed");
      return;
    }

    setErrorMessage("Ready to deploy..!!");
    setDataChecked(true);
  }

  //Post product
  async function postProduct(e: FormEvent) {
    e.preventDefault();

    if (!dataChecked) {
      setErrorMessage("Please check if the data is prepared to deploy");
      return;
    }

    // console.log("Product Details:");
    // console.log("File: ", file);
    // console.log("Name: ", productName);
    // console.log("Price: ", productPrice);
    // console.log("Stock: ", productStock);
    // console.log("Tags: ", productTags);
    // console.log("Description: ", productDescription);
    // console.log("Categories: ", productCatagories);

    //* process tags

    let processedTags: string[] = [];

    if (productTags) {
      // Process the tags only if productTags is provided
      processedTags = productTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    try {
      const response = await fetch(`${window.location.origin}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: file,
          name: productName,
          price: productPrice,
          stock: productStock,
          tags: processedTags.length === 0 ? productTags : processedTags,
          description: productDescription,
          categories: productCatagories,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        resetPage();
      }
    } catch (error) {
      console.error("Error posting product:", error);
    }
  }

  function resetPage() {
    setModalShow(false);

    setFile("");
    setProductName("");
    setProductprice("");
    setProductStock("");
    setProductTags("");
    setProductDescription("");
    setProductCatagories([false, false, false, false, false, false]);
    setErrorMessage("");
    setDataChecked(false);
    putProducts;
  }

  //FormInputs

  const [file, setFile] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductprice] = useState<string>("");
  const [productStock, setProductStock] = useState<string>("");
  const [productTags, setProductTags] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productCatagories, setProductCatagories] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  return (
    <Draggable handle=".handle" defaultPosition={{ x: 300, y: -100 }}>
      <div
        className={
          active
            ? "fixed h-[600px] w-[800px] bg-background border shadow-xl shadow-black rounded-lg z-30"
            : "hidden"
        }
      >
        <div className="border-b p-2 flex flex-row justify-between items-center h-[38px] handle">
          <div className="font-bold text-sm pl-1">Add item</div>
          <div className="w-[100px] h-[98%] border bg-background hover:bg-zinc-400 dark:hover:bg-zinc-900 select-none rounded-lg text-center text-[10px] font-bold flex flex-row justify-center items-center text-zinc-500 dark:text-zinc-700">
            Draggable
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setModalShow(false);
            }}
          >
            <X
              size={18}
              className="hover:scale-110 transition-transform cursor-pointer"
            />
          </Button>
        </div>
        <div className="h-[558px] w-full p-2">
          <form
            onSubmit={(e) => {
              postProduct(e);
            }}
            // encType="multipart/form-data"
          >
            <div className="h-[160px] w-full grid grid-cols-4 gap-4">
              <div className="h-[160px] w-full aspect-square">
                <FileUpload
                  file={file}
                  setFile={setFile}
                  dataChecked={dataChecked}
                />
              </div>
              <div className="col-span-3 w-full h-full flex flex-col justify-around items-start pr-2">
                <Input
                  type="text"
                  placeholder="Product name"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  disabled={dataChecked}
                />
                <div className="w-full grid grid-cols-2 gap-x-4">
                  <Input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => {
                      setProductprice(e.target.value);
                    }}
                    disabled={dataChecked}
                  />
                  <Input
                    type="number"
                    placeholder="Available Stock"
                    value={productStock}
                    onChange={(e) => {
                      setProductStock(e.target.value);
                    }}
                    disabled={dataChecked}
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Tags (Sperate them with commas ',')"
                  value={productTags}
                  onChange={(e) => {
                    setProductTags(e.target.value);
                  }}
                  disabled={dataChecked}
                />
              </div>
            </div>
            <div className="p-2">
              <Textarea
                rows={6}
                className="resize-none"
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
                disabled={dataChecked}
              />

              <div className="h-[220px] w-full mt-4 grid grid-cols-2 gap-4">
                <div className="w-full h-full border rounded-lg">
                  <ScrollArea className="h-full">
                    <h3 className="text-center font-semibold py-2 border-b">
                      Catagories
                    </h3>
                    <div className="px-2 grid grid-flow-row gap-y-2 pt-2">
                      {productCatagoriesList.map((item, index) => (
                        <div
                          className="grid grid-cols-9 items-center font-semibold"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            className="mx-auto cursor-pointer"
                            id={item}
                            checked={productCatagories[index]}
                            onChange={(e) => {
                              const updatedCategories = [...productCatagories];
                              updatedCategories[index] = e.target.checked;
                              setProductCatagories(updatedCategories);
                            }}
                            disabled={dataChecked}
                          />

                          <span className="col-span-8 flex flex-row justify-center">
                            <label htmlFor={item} className="cursor-pointer">
                              {item}
                            </label>
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="w-full h-full">
                  <div className="w-full h-1/2 border rounded-lg flex justify-center items-center text-zinc-700 dark:text-zinc-300 font-mono">
                    {errorMessage}
                  </div>
                  <div className="w-ful h-1/2 flex flex-row flex-wrap justify-between items-end px-4">
                    {dataChecked ? (
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setErrorMessage("");
                          setDataChecked(false);
                        }}
                      >
                        Re-edit
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          checkDatas();
                        }}
                      >
                        Check
                      </Button>
                    )}
                    {dataChecked ? (
                      <Button type="submit">Add to Shop</Button>
                    ) : (
                      <Button disabled>Add to Shop</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Draggable>
  );
}

const productCatagoriesList = [
  "Fall Collection",
  "Flowers",
  "Plants",
  "Bouquets",
  "Gifts",
  "Equipements",
];
