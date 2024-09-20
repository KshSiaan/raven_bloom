import BestSellers from "@/components/best-sellers";
import Navbar from "@/components/navbar";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Banner from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";

// import { motion } from "framer-motion";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <BackgroundBeams className=" h-dvh w-dvw" />
      <header className="h-dvh w-dvw">
        <Navbar />

        <div className="h-full w-full flex flex-row justify-around items-center">
          <div className="w-1/2 flex flex-row justify-center items-center">
            <h1 className="text-5xl mx-auto font-bold text-zinc-600 dark:text-zinc-400">
              Craft stunning
              <FlipWords words={words} />
              <br /> with RavenBloom
            </h1>
          </div>
          <div className="w-1/2 flex flex-row justify-center items-center">
            <div className="flex flex-col justify-center">
              <div className="text-xl font-semibold text-zinc-600 dark:text-zinc-400">
                Lets see, how much you know about flowers?
              </div>
              <div className="z-20 flex flex-row justify-around items-center mt-4">
                <Input
                  className="flex-grow-0"
                  type="text"
                  placeholder="My answer.."
                />
                <Button className="ml-4">is it?</Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full">
        <h2 className="uppercase text-center font-bold italic text-4xl text-zinc-600 dark:text-zinc-300">
          The bestsellers
        </h2>

        <BestSellers />
      </div>

      <Banner
        title="Wish them a happy birthday"
        paragraph="Send a bouquet of happiness for their special day."
        buttonText="Shop Happy Birthday"
        image="/birthday_bg.jpg"
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
              className="w-[80%] h-[64px] border rounded-lg flex flex-row py-2 px-2 mx-auto hover:scale-105 hover:bg-zinc-900 transition duration-300 cursor-pointer"
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

const words = ["blossoms", "bouquets", "arrangements", "florals", "petals"];

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
