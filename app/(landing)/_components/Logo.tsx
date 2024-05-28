import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

import React from "react";

const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image src="/logo.svg" width="40" height="40" alt="Logo" />
      <p className={cn("font-semibold", font.className)}>Notion</p>
    </div>
  );
};

export default Logo;
