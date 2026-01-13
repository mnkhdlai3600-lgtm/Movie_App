"use client";

import useSWR from "swr";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetcherInput } from "@/utils/fetcherInput";

export type Genre = {
  id: number;
  name: string;
};

type MovieResultButProps = {
  selectedGenres: number[];
  onChange: (genres: number[]) => void;
};

export default function MovieResultBut({
  selectedGenres,
  onChange,
}: MovieResultButProps) {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?language=en`,
    fetcherInput
  );

  const handleToggle = (id: number) => {
    const updated = selectedGenres.includes(id)
      ? selectedGenres.filter((g) => g !== id)
      : [...selectedGenres, id];

    onChange(updated);
  };

  return (
    <div className=" ">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">Genres</h1>
        <p className="text-sm text-gray-500">Filter search results by genre</p>
      </div>

      <div className="border-b border-gray-300 w-full" />

      {data?.genres.map((genre: Genre) => (
        <Badge
          key={genre.id}
          onClick={() => handleToggle(genre.id)}
          className={`border rounded-2xl text-[12px] font-semibold flex gap-2 items-center pr-1 pl-2.5 py-px cursor-pointer transition-colors ${
            selectedGenres.includes(genre.id)
              ? "bg-black text-white border-black"
              : "border-gray-300 text-black"
          }`}
        >
          {genre.name}
          <ChevronRight className="h-4 w-4" />
        </Badge>
      ))}
    </div>
  );
}
