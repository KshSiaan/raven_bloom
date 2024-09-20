import React from "react";
import Image from "next/image";

type bannerProps = {
  title: string;
  paragraph: string;
  buttonText: string;
  image: string;
  //   linkTo: string;
};
export default function Banner({
  title,
  paragraph,
  buttonText,
  image,
}: bannerProps) {
  return (
    <div className="mt-4 h-[500px] flex flex-row flex-wrap justify-between items-center">
      <div className="h-1/2 p-4 pl-8 flex flex-col justify-around items-start ">
        <h2 className="text-4xl font-semibold uppercase italic text-zinc-600 dark:text-zinc-400">
          {title}
        </h2>
        <p className="text-xl mt-4 ">{paragraph}</p>

        <button className="font-bold text-lg py-2 px-6 border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
          {buttonText}
        </button>
      </div>
      <div className="">
        <div className="relative w-500 h-full">
          <Image
            src={image}
            className="aspect-square object-cover"
            height="500"
            width="500"
            alt="thumbnail"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background"></div>
        </div>
      </div>
    </div>
  );
}
