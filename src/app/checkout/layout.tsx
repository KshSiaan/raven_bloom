import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, House } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="p-2">
        <nav className="w-full h-auto py-1 px-4 flex flex-row justify-between items-center">
          <div className=""></div>
          <h2 className="font-bold text-4xl text-center">RavenBloom</h2>
          <div className=""></div>
        </nav>
        <div className="flex flex-row flex-wrap justify-between items-center">
          <div className="">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>
          <div className="">
            <Button variant="ghost">
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
