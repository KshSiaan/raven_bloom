import Image from "next/image";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "./ui/card";

interface dataType {
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

export default function BestSellers({
  bestSeller,
}: {
  bestSeller: dataType[];
}) {
  return (
    <div className="w-full py-6 grid grid-flow-row">
      <div className="py-8 overflow-visible w-full ">
        <Carousel className="w-[90%] mx-auto overflow-visible ">
          <CarouselContent className="overflow-visible">
            {bestSeller.map((item, index) => (
              <CarouselItem className="basis-1/4 overflow-visible" key={index}>
                <Card
                  key={index}
                  className="h-[400px] w-full overflow-hidden cursor-pointer transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
                  // onClick={() => {
                  //   router.push(params.productPage + "/" + item._id);
                  // }}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-dvw h-auto flex flex-row justify-center items-center">
        <Button className="rounded-full font-bold" variant="outline">
          Shop From The Bests
        </Button>
      </div>
    </div>
  );
}
