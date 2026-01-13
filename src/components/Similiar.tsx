"use client";

import { fetcherInput } from "@/utils/fetcherInput";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Movie } from "./Movies";

export default function Similiar() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("query");
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`,
    fetcherInput
  );
  const searchData = data?.results || [];

  return (
    <div className="flex flex-col gap-9 mb-28">
      <div className="flex justify-between">
        <strong className="text-2xl">More like this</strong>
        <Link
          href={`/moreLikeThis?query=${movieId}`}
          className="flex gap-2 justify-center items-center"
        >
          See more <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {searchData
          .slice(
            0,
            typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 5
          )
          .map((films: Movie) => {
            return (
              <Link key={films.id} href={`/movieDetail?query=${films.id}`}>
                <div className="rounded-lg overflow-hidden shadow-lg ">
                  <img
                    className="object-cover object-center md:min-h-85 min-h-58.5"
                    src={` https://image.tmdb.org/t/p/original${films.poster_path}`}
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
                    <p className="">{films.original_title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
