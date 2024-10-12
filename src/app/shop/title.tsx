"use client";

import { usePathname } from "next/navigation";

export default function Title() {
  const path = usePathname();
  if (path == "/shop") {
    return (
      <div className="h-[124px] w-full border-b flex flex-col justify-center items-center px-[10%] font-medium">
        Welcome to RavenBloom, where nature&apos;s beauty comes alive.
      </div>
    );
  } else {
    return <></>;
  }
}
