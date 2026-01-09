"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film, Moon, Search, X } from "lucide-react";
import { InputValue } from "./components/InputValue";
import { MovieGenre } from "./components/ShadCNBut";

export const Header = () => {
  const [openInput, setOpenInput] = useState(false);

  return (
    <div>
      <div
        className={`flex justify-between items-center px-5 py-4.75 md:px-40 md:py-2.75 ${
          openInput ? "hidden" : "block"
        }`}
      >
        <Link href="/" className={``}>
          <div className="flex gap-2 items-center">
            <Film className="w-4.25 h-4.25" />
            <p className="text-indigo-700 text-[14px] font-bold italic">
              Movie Z
            </p>
          </div>
        </Link>
        <div className="hidden md:flex gap-3">
          <MovieGenre />
          <div>
            <Search className="text-gray-400 w-4 h-4 absolute ml-2 top-5" />
            <InputValue />
          </div>
          <X
            onClick={() => setOpenInput(false)}
            className={` w-4 h-4 ${openInput ? "block" : "hidden"}`}
          />
        </div>
        <div className="flex gap-3 ">
          <Button
            variant="outline"
            className={` border-gray-300 md:hidden ${
              openInput ? "hidden" : "block"
            }`}
            onClick={() => setOpenInput(true)}
          >
            <Search />
          </Button>
          <Button
            variant="outline"
            className={` border-gray-300  ${openInput ? "hidden" : "block"}`}
          >
            <Moon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {openInput && (
        <div className="md:hidden w-full flex items-center justify-between px-5 py-4.75 md:px-20 md:py-2.75">
          <MovieGenre />
          <div>
            <Search className="text-gray-400 w-4 h-4 absolute ml-2 top-7" />
            <InputValue />
          </div>
          <X
            onClick={() => setOpenInput(false)}
            className={` w-4 h-4 ${openInput ? "block" : "hidden"}`}
          />
        </div>
      )}

      <div className={`md:hidden ${openInput ? "block" : "hidden"}`}></div>
    </div>
  );
};
