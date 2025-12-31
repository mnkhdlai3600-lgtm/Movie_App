import { Film, Moon, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InputValue } from "./inputSearch/[inputValue]/InputValue";
import { MovieGenre } from "./genres/[genresCategory]/ShadCNBut";

export const Header = () => {
  return (
    <div className="flex justify-between items-center px-5 py-4.75 md:px-20 md:py-2.75">
      {" "}
      <Link href="/">
        <div className=" gap-2 flex justify-between items-center">
          <Film className=" w-4.25 h-4.25 " />
          <p className="text-indigo-700 text-[14px] font-bold">Movie Z</p>
        </div>
      </Link>
      <div className="hidden md:flex gap-3">
        <MovieGenre />

        <div>
          <InputValue />
        </div>
      </div>
      <div className="flex gap-3">
        {" "}
        <Button variant="outline" className="w-9 h-9 border-gray-300 md:hidden">
          <Search />
        </Button>
        <Button variant="outline" className="w-9 h-9 border-gray-300">
          <Moon />
        </Button>
      </div>
    </div>
  );
};
