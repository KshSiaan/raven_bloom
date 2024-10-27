import BestSellers from "@/components/best-sellers";
import Navbar from "@/components/navbar";
import Banner from "@/components/ui/banner";
import Footer from "@/components/ui/footer";
import { Metadata } from "next";

import Image from "next/image";

export const metadata: Metadata = {
  title: "RavenBloom || Home",
  description: "Your Favourite flowershop",
};

export default async function Home() {
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

  const bestSeller = dataSet.sort((a, b) => a.stock - b.stock).slice(0, 7);

  return (
    <>
      <Navbar />

      <header className="h-dvh w-dvw bg-gradient-to-br from-zinc-500 to-transparent bg-[length:5%_100%]">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-background to-background">
          <div className="h-[48px]"></div>

          <div className="h-[calc(100dvh-48px)] w-full grid grid-cols-7 px-6">
            <div className="col-span-4 h-full w-full flex flex-col justify-center items-start pl-6">
              <h1 className="text-6xl font-extrabold text-foreground">
                Welcome to the <br /> Heart of RavenBloom
              </h1>
              <p className="mt-8 text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl">
                Discover the artistry behind nature&apos;s finest creations.
                RavenBloom brings a curated selection of exquisite flowers and
                succulents, crafted with passion and precision. From elegant
                arrangements to vibrant bouquets, each piece tells a story—your
                story. Let the beauty of nature breathe life into your moments.
              </p>
            </div>
            <div className="col-span-3 h-full w-full p-6">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/headerImg.webp"
                  height={1000}
                  width={1000}
                  alt="header_img"
                  className="h-full w-full object-cover drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full">
        <h2 className="uppercase text-center font-bold italic text-4xl text-zinc-600 dark:text-zinc-300">
          The bestsellers
        </h2>

        <BestSellers bestSeller={bestSeller} />
      </div>

      <Banner
        title="Wish them a happy birthday"
        paragraph="Send a bouquet of happiness for their special day."
        buttonText="Shop Happy Birthday"
        image="/birthday.jpg"
      />

      <div className="h-14 w-full"></div>

      {/* SecondPhase */}

      <div className="h-[300px] grid grid-cols-2">
        <div className="mt-4 w-full h-full flex flex-row flex-wrap justify-between items-center">
          <div className="h-1/2 pl-4 flex flex-col justify-around items-start ">
            <h2 className="text-2xl font-semibold uppercase italic text-zinc-600 dark:text-zinc-400">
              Daughters Day
            </h2>
            <p className="text-lg mt-2 ">
              Heartfelt gifts to cherish your daughter on 9/25.
            </p>

            <button className="font-bold text-lg py-2 px-6 border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
              Shop Daughters Day
            </button>
          </div>
          <div className="">
            <div className="relative w-[300px] h-full">
              <Image
                src="/daughter.jpg"
                className="aspect-square object-cover"
                height="300"
                width="300"
                alt="thumbnail"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full h-full flex flex-row flex-wrap justify-between items-center">
          <div className="h-1/2 pl-4 flex flex-col justify-around items-start ">
            <h2 className="text-2xl font-semibold uppercase italic text-zinc-600 dark:text-zinc-400">
              Fall is here
            </h2>
            <p className="text-lg mt-2 ">
              Bold blooms that capture the best season has to offer.
            </p>

            <button className="font-bold text-lg py-2 px-6 border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
              Shop Fall
            </button>
          </div>
          <div className="">
            <div className="relative w-[300px] h-full">
              <Image
                src="/birthday_bg.jpg"
                className="aspect-square object-cover"
                height="300"
                width="300"
                alt="thumbnail"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px]"></div>
      <div className="mt-8">
        <h1 className="text-center text-4xl font-bold italic text-zinc-600 dark:text-zinc-400">
          Shop by occasion
        </h1>

        <div className="grid grid-cols-2 justify-center items-center py-8 gap-y-8">
          {shopByOccasionInfo.map((item, index) => (
            <div
              className="w-[80%] h-[64px] border rounded-lg flex flex-row py-2 px-2 mx-auto hover:scale-105 hover:bg-zinc-100 hover:dark:bg-zinc-900 transition duration-300 cursor-pointer"
              key={index}
            >
              <Image
                src={item.image}
                height={48}
                width={48}
                alt="thumbnail"
                className="rounded-lg object-cover aspect-square"
              />
              <div className="pl-2 flex flex-col justify-evenly items-start">
                <h3 className="font-semibold text-md">{item.title}</h3>
                <p className="font-light text-sm text-ellipsis line-clamp-1 overflow-hidden">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Banner
        title="Farmer's market season"
        paragraph="Pick the perfect bouquet from our farm fresh collection"
        buttonText="Shop Fresh from farm"
        image="/birthday_bg.jpg"
      />

      <Footer />
    </>
  );
}

const shopByOccasionInfo = [
  {
    title: "Sympathy",
    desc: "...",
    image: "/birthday_bg.jpg",
  },
  {
    title: "Birthday",
    desc: "...",
    image: "/birthday_bg.jpg",
  },

  {
    title: "Get Well",
    desc: "...",
    image: "/birthday_bg.jpg",
  },
  {
    title: "Just because",
    desc: "...",
    image: "/birthday_bg.jpg",
  },
  {
    title: "Anniversary",
    desc: "...",
    image: "/birthday_bg.jpg",
  },
  {
    title: "Thank you",
    desc: "...",
    image: "/birthday_bg.jpg",
  },
  {
    title: "Thinking of you",
    desc: "...",
    image: "/birthday_bg.jpg",
  },
  {
    title: "Same day dilevery",
    desc: "Order by 2pm (1pm Sat-Sun) in your recipient's time zone for same day delivery.",
    image: "/birthday_bg.jpg",
  },
];
