"use client";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, House } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <>
      <header className="p-2">
        <nav className="w-full h-auto py-1 px-4 flex flex-row justify-between items-center">
          <div className=""></div>
          <h2 className="font-bold text-4xl text-center">RavenBloom</h2>
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
      <main className="p-4">{children}</main>
      <Footer />
    </>
  );
}
