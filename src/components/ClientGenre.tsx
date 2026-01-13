"use client";

import { fetcherInput } from "@/utils/fetcherInput";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import GenreBut, { Genre } from "./GenreBut";
import { Movie } from "./Movies";
import { DynamicPagination } from "./PageInation";

export default function GenreMoviesWrapper() {
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genre");
  const currentPage = Number(searchParams.get("page") ?? "1");

  const { data, isLoading, error } = useSWR(
    genreIds
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=${currentPage}`
      : null,
    fetcherInput
  );

  const genreData = data?.results || [];

  const { data: dataGenre } = useSWR<{ genres: Genre[] }>(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?language=en`,
    fetcherInput
  );

  const genreIdsFromQuery = genreIds?.split(",").map((id) => Number(id)) || [];

  const matchedGenreNames =
    dataGenre?.genres
      .filter((genre) => genreIdsFromQuery.includes(genre.id))
      .map((genre) => genre.name) || [];

  const result = matchedGenreNames.map((name) => `"${name}"`).join(" ");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  return (
    <div className="flex flex-col gap-8 justify-center md:mx-40 md:mt-13 md:mb-10 m-5 md:flex-row">
      <div className="shrink-0">
        <h1 className="font-semibold text-3xl">Search filter</h1>
        <GenreBut />
      </div>
      <div className="border border-gray-300 md:block hidden"></div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <p className="flex gap-2 font-semibold text-[20px]">
            <span>{genreData.length}</span>
            titles in
            {result}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {genreData.map((films: Movie) => (
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
          <DynamicPagination />
        </div>
      </div>
    </div>
  );
}
