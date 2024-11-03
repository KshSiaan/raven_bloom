import React from "react";
import Image from "next/image";

export default function DualBanner() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <BannerSection
          title="Daughters Day"
          description="Heartfelt gifts to cherish your daughter on 9/25."
          buttonText="Shop Daughters Day"
          imageSrc="/daughter.jpg"
        />
        <BannerSection
          title="Fall is here"
          description="Bold blooms that capture the best season has to offer."
          buttonText="Shop Fall"
          imageSrc="/birthday_bg.jpg"
        />
      </div>
      <div className="h-[100px]"></div>
      <h1 className="text-center text-3xl md:text-4xl font-bold italic text-zinc-600 dark:text-zinc-400 mt-8">
        Shop by occasion
      </h1>
    </div>
  );
}

interface BannerSectionProps {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
}

function BannerSection({
  title,
  description,
  buttonText,
  imageSrc,
}: BannerSectionProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch bg-background rounded-lg overflow-hidden shadow-lg">
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-4">
        <h2 className="text-2xl font-semibold uppercase italic text-zinc-600 dark:text-zinc-400">
          {title}
        </h2>
        <p className="text-lg">{description}</p>
        <button className="self-start font-bold text-lg py-2 px-6 border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
          {buttonText}
        </button>
      </div>
      <div className="w-full md:w-1/2 h-[200px] md:h-auto relative">
        <Image src={imageSrc} layout="fill" objectFit="cover" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-background"></div>
      </div>
    </div>
  );
}
