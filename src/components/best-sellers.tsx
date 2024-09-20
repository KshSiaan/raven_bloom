"use client";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Button } from "./ui/button";
const bestSellerInfos = [
  {
    title: "Pick of the Patch Pumpkin Bouquet",
    detail:
      "Send a seasonal standout with the Pick of the Patch Bouquet, a colorful collection of sunflowers, roses, and solidago to delight in the fall vibes.",
    image: "/pumpkin_bouquet.png",
    viewed: false,
  },
  {
    title: "Pick of the Patch Pumpkin Bouquet",
    detail:
      "Send a seasonal standout with the Pick of the Patch Bouquet, a colorful collection of sunflowers, roses, and solidago to delight in the fall vibes.",
    image: "/pumpkin_bouquet.png",
    viewed: false,
  },
  {
    title: "Pick of the Patch Pumpkin Bouquet",
    detail:
      "Send a seasonal standout with the Pick of the Patch Bouquet, a colorful collection of sunflowers, roses, and solidago to delight in the fall vibes.",
    image: "/pumpkin_bouquet.png",
    viewed: false,
  },
  {
    title: "Pick of the Patch Pumpkin Bouquet",
    detail:
      "Send a seasonal standout with the Pick of the Patch Bouquet, a colorful collection of sunflowers, roses, and solidago to delight in the fall vibes.",
    image: "/pumpkin_bouquet.png",
    viewed: false,
  },
];

export default function BestSellers() {
  return (
    <div className="w-full px-2 py-6 grid grid-flow-row grid-cols-4">
      {bestSellerInfos.map((item, index) => (
        <CardContainer className="inter-var" key={index}>
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[300px] h-[400px] rounded-xl p-3 border cursor-pointer">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {item.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-ellipsis text-wrap line-clamp-2"
            >
              {item.detail}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={item.image}
                height="300"
                width="300"
                className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      ))}
      <div className="w-dvw h-auto flex flex-row justify-center items-center">
        <Button className="rounded-full font-bold" variant="outline">
          Shop From The Bests
        </Button>
      </div>
    </div>
  );
}
