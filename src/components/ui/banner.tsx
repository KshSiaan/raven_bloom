import React from "react";
import Image from "next/image";

type BannerProps = {
  title: string;
  paragraph: string;
  buttonText: string;
  image: string;
};

export default function Banner({
  title,
  paragraph,
  buttonText,
  image,
}: BannerProps) {
  return (
    <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="w-full md:w-1/2 order-2 md:order-1 p-4 md:pl-8 flex flex-col items-center md:items-start justify-center space-y-4 md:space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold uppercase italic text-zinc-600 dark:text-zinc-400 text-center md:text-left">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-center md:text-left">
          {paragraph}
        </p>
        <button className="font-bold text-lg py-2 px-6 border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
          {buttonText}
        </button>
      </div>
      <div className="w-full md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
        <div className="relative aspect-square md:aspect-auto md:h-[500px]">
          <Image
            src={image}
            alt="Banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent to-background"></div>
        </div>
      </div>
    </div>
  );
}
