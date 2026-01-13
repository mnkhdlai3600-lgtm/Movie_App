"use client";

import { fetcherInput } from "@/utils/fetcherInput";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { Movie } from "./Movies";
import { DynamicPagination } from "./PageInation";

export default function MoviesListWrapper() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("query");
  const currentPage = Number(searchParams.get("page") ?? "1");

  const { data, isLoading, error } = useSWR(
    movieId
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/similar?language=en-US&page=${currentPage}`
      : null,
    fetcherInput
  );

  const movies = data?.results || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  return (
    <div className="md:mx-40 mx-5 flex flex-col gap-8 mt-8">
      <strong className="text-2xl">More like this</strong>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {movies.map((movie: Movie) => (
          <Link
            href={`/movieDetail?query=${movie.id}`}
            key={movie.id}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img
              className="object-cover object-center"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className="bg-gray-200 h-19 md:h-22.5 p-2">
              <div className="flex">
                <p className="text-[12px] md:text-[14px] flex items-center">
                  ⭐️{movie.vote_average}
                </p>
                <p className="opacity-50 text-[12px] flex items-center">/10</p>
              </div>
              <p>{movie.original_title}</p>
            </div>
          </Link>
        ))}
      </div>
      <DynamicPagination />
    </div>
  );
}
