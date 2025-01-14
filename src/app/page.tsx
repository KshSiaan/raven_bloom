"use client";
import { lazy, Suspense, useEffect, useState } from "react";
const BestSellers = lazy(() => import("@/components/best-sellers"));
import Navbar from "@/components/navbar";
import Banner from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import DualBanner from "@/components/ui/dual-banner";
import Footer from "@/components/ui/footer";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "next-themes";
import Loading from "@/components/ui/loading";

interface dataType {
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

export default function Home() {
  const { theme } = useTheme();
  const [dataSet, setDataset] = useState<dataType[]>([]);

  async function fetchProductData() {
    try {
      const response = await fetch(`${window.location.origin}/api/allproducts`);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const productData = await response.json();
      setDataset(productData.data);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const bestSeller = (dataSet || [])
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 7);

  const getBirthdayImage = () => {
    return theme === "light" ? "/birthday-light.jpg" : "/birthday_bg.jpg";
  };

  return (
    <>
      <Navbar />

      <header className="h-dvh w-dvw bg-background md:bg-[length:5%_100%] relative">
        <div className="h-[100px] w-full absolute bg-muted top-[50%] translate-y-[-50%] hidden md:block">
          <div className="w-[80%] h-full bg-background mx-auto"></div>
        </div>
        <div className="w-full h-full bg-gradient-to-b from-transparent via-background to-background">
          <div className="h-[48px]"></div>

          <div className="h-[calc(100dvh-48px)] w-full flex justify-center items-center">
            <div className="relative flex items-center justify-center">
              <div className="p-8 bg-background relative z-20">
                <h1 className="w-full text-4xl text-center sm:text-6xl md:text-8xl font-bold text-foreground">
                  RavenBloom
                </h1>
                <p className="mt-8 text-sm md:text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl">
                  Discover the artistry behind nature&apos;s finest creations.
                  RavenBloom brings a curated selection of exquisite flowers and
                  succulents, crafted with passion and precision. From elegant
                  arrangements to vibrant bouquets, each piece tells a
                  story—your story. Let the beauty of nature breathe life into
                  your moments.
                </p>
                <div className="flex justify-center items-center mt-6">
                  <Button
                    variant="link"
                    className="rounded-full"
                    size="lg"
                    asChild
                  >
                    <Link href="/shop">Shop now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full">
        <h2 className="uppercase text-center font-bold text-2xl sm:text-3xl md:text-4xl text-zinc-600 dark:text-zinc-300">
          The bestsellers
        </h2>

        <Suspense fallback={<Loading />}>
          <BestSellers bestSeller={bestSeller} />
        </Suspense>
      </div>

      <Banner
        title="Wish them a happy birthday"
        paragraph="Send a bouquet of happiness for their special day."
        buttonText="Shop Happy Birthday"
        image={getBirthdayImage()}
      />

      <div className="h-14 w-full"></div>

      <DualBanner />
      <div className="h-[100px]"></div>
      <div className="mt-8">
        <h1 className="text-center text-4xl font-bold italic text-zinc-600 dark:text-zinc-400">
          Shop by occasion
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-8 gap-y-8">
          {shopByOccasionInfo.map((item, index) => (
            <div
              className="w-[80%] h-[64px] border rounded-lg flex flex-row py-2 px-2 mx-auto hover:scale-105 hover:bg-zinc-100 hover:dark:bg-zinc-900 transition duration-300 cursor-pointer"
              key={index}
            >
              <Image
                src="/birthday_bg.jpg"
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
        image={getBirthdayImage()}
      />

      <Footer />
    </>
  );
}

const shopByOccasionInfo = [
  {
    title: "Sympathy",
    desc: "Express your condolences with a thoughtful arrangement",
    imageLight: "/sympathy-light.jpg",
    imageDark: "/sympathy-dark.jpg",
  },
  {
    title: "Birthday",
    desc: "Celebrate their special day with a vibrant bouquet",
    imageLight: "/birthday-light.jpg",
    imageDark: "/birthday_bg.jpg",
  },
  {
    title: "Get Well",
    desc: "Send warm wishes for a speedy recovery",
    imageLight: "/get-well-light.jpg",
    imageDark: "/get-well-dark.jpg",
  },
  {
    title: "Just because",
    desc: "Surprise someone with a spontaneous floral gift",
    imageLight: "/just-because-light.jpg",
    imageDark: "/just-because-dark.jpg",
  },
  {
    title: "Anniversary",
    desc: "Commemorate your love with a romantic arrangement",
    imageLight: "/anniversary-light.jpg",
    imageDark: "/anniversary-dark.jpg",
  },
  {
    title: "Thank you",
    desc: "Show your appreciation with a beautiful bouquet",
    imageLight: "/thank-you-light.jpg",
    imageDark: "/thank-you-dark.jpg",
  },
  {
    title: "Thinking of you",
    desc: "Let them know they're on your mind with a thoughtful gift",
    imageLight: "/thinking-of-you-light.jpg",
    imageDark: "/thinking-of-you-dark.jpg",
  },
  {
    title: "Same day delivery",
    desc: "Order by 2pm (1pm Sat-Sun) in your recipient's time zone for same day delivery.",
    imageLight: "/same-day-light.jpg",
    imageDark: "/same-day-dark.jpg",
  },
];
