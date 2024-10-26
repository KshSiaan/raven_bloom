"use client";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, House } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from "next/navigation";
import Stepper from "@/components/ui/stepper";
import { useTheme } from "next-themes";
import { checkoutContext, checkoutInfoType } from "./checkoutContext";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { theme } = useTheme();

  const textStrokeStyle = {
    WebkitTextStroke: theme === "dark" ? "1px #18181b" : "1px #71717a",
  };
  const [checkoutInfo, setCheckoutInfo] = useState<checkoutInfoType>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    locationType: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    del_phone: "",
    occasion: "",
    message: "",
  });

  const [step, setStep] = useState<number>(0);

  return (
    <>
      <header className="p-2">
        <nav className="w-full h-auto py-1 px-4 flex flex-row justify-between items-center">
          <div className=""></div>
          <h2 className="font-bold text-4xl text-center">
            RavenBloom
            <span className="text-transparent" style={textStrokeStyle}>
              {" "}
              Checkout
            </span>
          </h2>
          <div className="">
            <ModeToggle />
          </div>
        </nav>
        <div className="flex flex-row flex-wrap justify-between items-center">
          <div className="">
            <Button
              variant="ghost"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>
          <div className="">
            <Button
              variant="ghost"
              onClick={() => {
                router.replace("/");
              }}
            >
              <House className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>
      <Stepper currentStep={step} />
      <checkoutContext.Provider
        value={{ setStep, checkoutInfo, setCheckoutInfo }}
      >
        <main className="p-4">{children}</main>
      </checkoutContext.Provider>
      <Footer />
    </>
  );
}
