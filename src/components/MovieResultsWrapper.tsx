"use client";

import React, { useState } from "react";
import { fetcherInput } from "@/utils/fetcherInput";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Movie } from "./Movies";
import { DynamicPagination } from "./PageInation";
import GenreBut from "./GenreBut";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MovieResultBut from "./MovieResultBut";

export function MovieResultsWrapper() {
  const searchParams = useSearchParams();

  const searchValueFromUrl = searchParams.get("searchValue") || "";
  const currentPage = Number(searchParams.get("page") ?? 1);

  const { data } = useSWR(
    searchValueFromUrl
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValueFromUrl}&language=en-US&page=${currentPage}`
      : null,
    fetcherInput
  );

  const searchData = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 10);

  // 👉 НЭМЭГДСЭН: genre state
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  // 👉 НЭМЭГДСЭН: genre-аар filter
  const filteredMovies =
    selectedGenres.length === 0
      ? searchData
      : searchData.filter((movie: Movie) =>
          movie.genre_ids?.some((id) => selectedGenres.includes(id))
        );

  return (
    <div className="flex gap-8 justify-center md:mx-20 mx-5 mb-8 min-h-screen">
      <div className="flex-1 flex flex-col gap-8">
        <h1 className="font-semibold text-3xl">Search results</h1>

        <p className="font-semibold text-[20px]">
          {filteredMovies.length} results for "{searchValueFromUrl}"
        </p>

        {filteredMovies.length === 0 ? (
          <div>
            <div className="border border-gray-200 rounded-lg h-40 w-202 flex justify-center items-center">
              <p className="text-gray-400">No results found.</p>
            </div>
            <DynamicPagination />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {filteredMovies.map((films: Movie) => (
              <Link key={films.id} href={`/movieDetail?query=${films.id}`}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    className="object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original${films.poster_path}`}
                    alt={films.original_title}
                  />
                  <div className="bg-gray-200 h-19 md:h-22.5 p-2">
                    <div className="flex">
                      <p className="text-[12px] md:text-[14px] flex items-center">
                        ⭐️{films.vote_average}
                      </p>
                      <p className="opacity-50 text-[12px] flex items-center">
                        /10
                      </p>
                    </div>
                    <p>{films.original_title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && <DynamicPagination />}
      </div>

      <div className="border-l-2 border-gray-100 shrink-0" />

      <div className="">
        <MovieResultBut
          selectedGenres={selectedGenres}
          onChange={setSelectedGenres}
        />
      </div>
    </div>
  );
}
