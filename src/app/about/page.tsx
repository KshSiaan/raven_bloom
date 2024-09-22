import Navbar from "@/components/navbar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";

export default function page() {
  return (
    <>
      <header className="pt-[48px]">
        <Navbar />
        <div className="p-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4">
        <h1 className="text-4xl font-semibold text-center italic">
          RavenBloom hass you covered
        </h1>
        <h4 className="text-xl font-md text-center pt-4">
          Welcome to the fun side of flowers! We take the guesswork out of
          gifting with beautiful, curated collections made with every occasion
          in mind.
        </h4>
      </div>
      <hr />
      <div className="mt-8">
        <h1 className="text-4xl font-bold italic text-center py-4">
          Top occasions
        </h1>

        <div className="w-full h-auto py-4">
          <CarosoulComponent list={occasionItems} />
        </div>
      </div>

      <div className="mt-4 h-[400px] w-full bg-[url('/bg-bg.jpg')] bg-center object-cover flex flex-row justify-center items-center">
        <div className="p-8 bg-background rounded-lg w-1/2">
          <h4 className="text-xl font-light text-center">
            freshness guarantee
          </h4>
          <p className="p-4 font-extralight text-center">
            We provide a 7-day fresh flower and a 14-day lush plant guarantee to
            ensure long-lasting blooms.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-4xl font-bold italic text-center py-4">
          Top catagories
        </h1>

        <div className="w-full h-auto py-4">
          <CarosoulComponent list={catagoriesItems} />
        </div>
      </div>

      <div className="mt-4 h-[400px] w-full bg-[url('/bg-bg2.jpg')] bg-center object-cover flex flex-row justify-center items-center">
        <div className="p-8 bg-background rounded-lg w-1/2">
          <h4 className="text-xl font-light text-center">send it same day</h4>
          <p className="p-4 font-extralight text-center">
            We offer same day delivery, order by 2pm in your recipient’s time
            zone for delivery from a local florist today.
          </p>
        </div>
      </div>
      <div className="mt-8 mb-12">
        <h1 className="text-4xl font-bold italic text-center py-4">
          Check out our customer favorites
        </h1>

        <div className="w-full h-auto py-4 ">
          <CarosoulComponent list={customerFavItems} />
        </div>

        <div className="flex flex-row flex-wrap justify-center items-center p-4">
          <Button className="rounded-full">Shop Bestsellers</Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

const occasionItems = [
  { title: "Birthday", img: "/pumpkin_bouquet.png" },
  { title: "Sympathy", img: "/pumpkin_bouquet.png" },
  { title: "Anniversary", img: "/pumpkin_bouquet.png" },
  { title: "Get well", img: "/pumpkin_bouquet.png" },
];

const catagoriesItems = [
  { title: "Flowers", img: "/pumpkin_bouquet.png" },
  { title: "Plants", img: "/pumpkin_bouquet.png" },
  { title: "Gifts", img: "/pumpkin_bouquet.png" },
  { title: "Same day delivery", img: "/pumpkin_bouquet.png" },
];

const customerFavItems = [
  { title: "Luminous Morning Bouquet", img: "/pumpkin_bouquet.png" },
  { title: "You're a Gem Bouquet", img: "/pumpkin_bouquet.png" },
  { title: "Sunset Serenade Bouquet", img: "/pumpkin_bouquet.png" },
  { title: "Colorful Carnival Bouquet", img: "/pumpkin_bouquet.png" },
];

const CarosoulComponent = ({
  list,
}: {
  list: Array<{ title: string; img: string }>;
}) => {
  return (
    <Carousel className="w-2/3 mx-auto">
      <CarouselContent>
        {list.map((item, index) => (
          <CarouselItem className="basis-1/3" key={index}>
            <Card className="aspect-[6/7] cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-900 transition-colors duration-300">
              <CardContent className="flex flex-col justify-evenly items-center">
                <Image
                  height={300}
                  width={300}
                  src={item.img}
                  alt="thumbnail"
                />
                <h3 className="text-xl font-semibold text-center">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
