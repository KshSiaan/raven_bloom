import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
      <div className="container mx-auto px-4 py-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
            RavenBloom
          </h2>
          <p className="text-sm">
            Bringing beauty and joy to your doorstep with our exquisite floral
            arrangements.
          </p>
          <div className="flex space-x-4">
            <SocialIcon Icon={Facebook} label="Facebook" />
            <SocialIcon Icon={Twitter} label="Twitter" />
            <SocialIcon Icon={Instagram} label="Instagram" />
            <SocialIcon Icon={Linkedin} label="LinkedIn" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-2">
          <FooterSection title="Shop" items={shopItems} />
          <FooterSection title="Company" items={companyItems} />
          <FooterSection title="Help" items={helpItems} />
          <FooterSection title="Occasions" items={occasionsItems} />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Stay Updated
          </h3>
          <p className="text-sm">
            Subscribe to our newsletter for exclusive offers and floral
            inspiration.
          </p>
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white dark:bg-zinc-800"
          />
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          © {new Date().getFullYear()} RavenBloom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href="#"
            className="text-sm hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({
  Icon,
  label,
}: {
  Icon: React.ElementType;
  label: string;
}) => (
  <Link
    href="#"
    aria-label={label}
    className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors duration-200"
  >
    <Icon className="h-6 w-6" />
  </Link>
);

const shopItems = [
  "Send Flowers",
  "Mixed Bouquets",
  "Same Day Delivery",
  "Plants",
  "Gifts",
];
const companyItems = ["About Us", "Careers", "Blog", "Press"];
const helpItems = ["FAQs", "Contact Us", "Delivery Info", "Returns Policy"];
const occasionsItems = [
  "Birthday",
  "Anniversary",
  "Sympathy",
  "Congratulations",
  "Get Well",
];
