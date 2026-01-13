"use client";

import React, { useState, useEffect } from "react";
import { fetcherInput } from "@/utils/fetcherInput";
import { ChevronRight } from "lucide-react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export type Genre = {
  name: string;
  id: number;
};

export const GenreBut = () => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?language=en`,
    fetcherInput
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const initialGenres = searchParams.get("genre")
    ? searchParams
        .get("genre")!
        .split(",")
        .map((id) => parseInt(id))
    : [];

  const [genreSelect, setGenreSelect] = useState<number[]>(initialGenres);

  const handleChange = (id: number) => {
    const newSelect = genreSelect.includes(id)
      ? genreSelect.filter((item) => item !== id)
      : [...genreSelect, id];

    setGenreSelect(newSelect);
    router.push(`/genres?genre=${newSelect.join(",")}`);
  };

  return (
    <div className="flex flex-wrap gap-4 md:w-144.25 w-83.75 p-5 ">
      <div>
        <h1 className="text-2xl font-semibold">Genres</h1>
        <p>See lists of movies by genre</p>
      </div>
      <div className="border-b border-solid border-gray-300 w-full max-h-50"></div>

      {data?.genres.map((genre: Genre) => (
        <Badge
          key={genre.id}
          onClick={() => handleChange(genre.id)}
          className={`border rounded-2xl text-[12px] font-semibold flex gap-2 items-center pr-1 pl-2.5 py-px transition-colors cursor-pointer ${
            genreSelect.includes(genre.id)
              ? "bg-black text-white border-black"
              : "border-gray-300 text-black"
          }`}
        >
          {genre.name} <ChevronRight className="h-4 w-4" />
        </Badge>
      ))}
    </div>
  );
};

export default GenreBut;
