import Banner from "@/components/ui/banner";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default async function Page() {
  const call = await fetch("http://localhost:3000/api/allproducts");
  const res = await call.json();

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

  const dataSet: dataType[] = res.data;

  //shopPage innner Dataset from main database
  const bestSeller = dataSet.sort((a, b) => a.stock - b.stock).slice(0, 7);
  const trends = dataSet.filter((item) => item.categories[0]).slice(0, 9);
  const gifts = dataSet.filter((item) => item.categories[4]).slice(0, 9);

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <div className="w-full">
          <h2 className="text-4xl font-bold uppercase mb-6">
            The best sellers
          </h2>

          <div className="py-8 overflow-visible">
            <Carousel className="w-[94%] mx-auto overflow-visible">
              <CarouselContent className="overflow-visible">
                {bestSeller.map((item, index) => (
                  <CarouselItem
                    className="sm:basis-1/2 md:basis-1/4 overflow-visible"
                    key={index}
                  >
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
        </div>
        <Banner
          title="Wish them a happy birthday"
          paragraph="Send a bouquet of happiness for their special day."
          buttonText="Shop Happy Birthday"
          image="/birthday_bg.jpg"
        />

        <h2 className="text-4xl font-bold uppercase mt-4 mb-6">
          Trending at the moment
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {trends.map((item, index) => (
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
              <div className="title font-semibold p-4 text-xl">{item.name}</div>
              <div className="text-end p-4 font-bold hover:text-green-500">
                ${item.price}
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-4xl font-bold uppercase mt-4 mb-6">
          To make things special
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {gifts.map((item, index) => (
            <Card
              key={index}
              className="h-[400px] w-full flex flex-col justify-between items-start overflow-hidden cursor-pointer transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
              // onClick={() => {
              //   router.push(params.productPage + "/" + item._id);
              // }}
            >
              <Image
                src="/productImgs/dummy_img.webp"
                className="h-[250px] w-[full] object-cover"
                width={500}
                height={500}
                alt="thumbnail"
              />
              <div className="">
                <div className="title font-semibold p-4 text-xl">
                  {item.name}
                </div>
                <div className="text-end p-4 font-bold hover:text-green-500">
                  ${item.price}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
