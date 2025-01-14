import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { productCatagoriesList } from "@/lib/other";

interface DataType {
  categories: boolean[];
  desc: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  tags: string[];
  __v: number;
  _id: string;
}

export default function BestSellers({
  bestSeller,
}: {
  bestSeller: DataType[];
}) {
  const navig = useRouter();
  const getPathNum = (thing: boolean[]): number => {
    return thing.findIndex(Boolean);
  };

  return (
    <div className="w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {bestSeller.map((item) => (
            <CarouselItem
              key={item._id}
              className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card
                className="h-full overflow-hidden cursor-pointer transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => {
                  navig.push(
                    "/shop/" +
                      productCatagoriesList[getPathNum(item.categories)] +
                      "/" +
                      item._id
                  );
                }}
              >
                <div className="aspect-square relative">
                  <Image
                    src="/productImgs/dummy_img.webp"
                    layout="fill"
                    objectFit="cover"
                    alt={item.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-right font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4 sm:-left-6 lg:-left-12" />
        <CarouselNext className="hidden sm:flex -right-4 sm:-right-6 lg:-right-12" />
      </Carousel>
      <div className="mt-6 sm:mt-8 text-center">
        <Button
          className="rounded-full font-bold text-sm sm:text-base"
          variant="outline"
        >
          Shop From The Bests
        </Button>
      </div>
    </div>
  );
}
