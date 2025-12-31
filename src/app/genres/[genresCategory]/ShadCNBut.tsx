"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetcherInput } from "@/utils/fetcherInput";
import { ChevronDown, ChevronRight } from "lucide-react";
import useSWR from "swr";

type Genre = {
  name: string;
  id: number;
};

export function MovieGenre() {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?language=en`,
    fetcherInput
  );
  console.log(data?.genres);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="">
          {" "}
          <ChevronDown /> Genres
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-100 border-0 p-5" align="start">
        <div className="flex  w-134.25 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Genres</h1>
            <p>See lists of movies by genre</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-full  max-h-50"></div>
          {data?.genres.map((genre: Genre) => {
            return (
              <DropdownMenuItem
                key={genre.id}
                className="border border-solid border-gray-300 rounded-2xl text-[12px] font-semibold py-0"
              >
                {genre.name} <ChevronRight />
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
