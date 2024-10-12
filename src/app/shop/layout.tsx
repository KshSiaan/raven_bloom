import Navbar from "@/components/navbar";

import ShopNav from "./shopNav";

import Footer from "@/components/ui/footer";

import BreadcrumbComponent from "./breadCrumbComp";
import Title from "./title";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="pt-[48px]">
        <Navbar authenticated />
        <Title />
        <ShopNav />

        <div className="p-4">
          <BreadcrumbComponent />
        </div>
      </header>
      <main className="p-4">{children}</main>
      <Footer />
    </>
  );
}
