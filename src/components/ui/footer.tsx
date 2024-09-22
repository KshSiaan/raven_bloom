import React from "react";
import { Input } from "./input";
import { Button } from "./button";

export default function Footer() {
  return (
    <footer className="h-auto w-full bg-zinc-300 dark:bg-black px-[10%] py-10">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-500 py-8 underline underline-offset-4 select-none">
        RavenBloom
      </h1>
      <div className="w-full flex flex-row flex-wrap justify-between text-zinc-700 dark:text-zinc-400">
        <div className="w-[60%] h-full flex flex-row flex-wrap justify-between items-start">
          <div className="">
            {footerChunkInfoA.map((item, index) => (
              <FooterChunk title={item.title} list={item.list} key={index} />
            ))}
          </div>
          <div className="">
            {footerChunkInfoB.map((item, index) => (
              <FooterChunk title={item.title} list={item.list} key={index} />
            ))}
          </div>
          <div className="">
            {footerChunkInfoC.map((item, index) => (
              <FooterChunk title={item.title} list={item.list} key={index} />
            ))}
          </div>
        </div>

        <div className="pt-4 w-[30%]">
          <h4 className="font-bold text-2xl text-zinc-700 dark:text-zinc-400 ">
            Freshen up your inbox
            <div className="flex flex-row flex-wrap justify-between py-4">
              <Input
                placeholder="Enter your email"
                type="email"
                className="w-3/4"
              />
              <Button>Sign Up</Button>
            </div>
          </h4>
        </div>
      </div>
    </footer>
  );
}

const footerChunkInfoA = [
  {
    title: "Account",
    list: ["Manage your account", "Order history", "Reminder service"],
  },
  {
    title: "Help",
    list: ["Customer Service", "Delivery Policy", "Reminder service"],
  },
];

const footerChunkInfoB = [
  {
    title: "Shop now",
    list: [
      "Send flowers",
      "Mixed flower bouquets",
      "Same day flower delivery",
      "Rose & Rose bouquets",
      "Plant delivery",
      "Gift delivery",
    ],
  },
  {
    title: "Company",
    list: ["Careers", "About RavenBloom"],
  },
];

const footerChunkInfoC = [
  {
    title: "Occasions",
    list: [
      "Birthday Delivery",
      "Sympathy Flowers",
      "Sympathy Plants",
      "Just Because",
      "Anniversary",
      "Congratulations",
    ],
  },
  {
    title: "Holidays",
    list: ["Valentine's Day", "Easter", "Mother's Day"],
  },
];

const FooterChunk = ({
  title,
  list,
}: {
  title: string;
  list: Array<string>;
}) => {
  return (
    <>
      <span className="py-0 px-2">
        <h4 className="font-semibold text-lg text-zinc-700 dark:text-zinc-300">
          {title}
        </h4>
        <ul className="font-normal text-sm ">
          {list.map((item, index) => (
            <li
              key={index + 100}
              className="cursor-pointer text-zinc-700 hover:text-zinc-950 hover:dark:text-zinc-300 transition-colors duration-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </span>
    </>
  );
};
