"use client";

import { fetcherInput } from "@/utils/fetcherInput";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import { Movie } from "../components/Movies";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import GenreBut from "../components/GenreBUt";

export default function MovieResults() {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();

  const searchValueFromUrl = searchParams.get("searchValue");

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValueFromUrl}&language=en-US&page=1`,
    fetcherInput
  );

  const searchData = data?.results || [];

  return (
    <div className="flex flex-col gap-8 justify-center items-start md:mx-20 mx-5 mt-13 md:mb-86 mb-8">
      <h1 className="font-semibold text-3xl">Search results</h1>
      <div className="flex md:justify-between gap-11 md:flex-row flex-col">
        <div className="flex flex-col gap-8">
          <p className="font-semibold text-[20px]">
            {searchData.length} results for "{searchValueFromUrl}"
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {searchData.slice(0, 5).map((films: Movie) => {
              return (
                <Link key={films.id} href={`/movieDetail?query=${films?.id}`}>
                  <div
                    key={films.id}
                    className="rounded-lg overflow-hidden shadow-lg "
                  >
                    <img
                      className="object-cover object-center "
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
                      <p>{films.original_title}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="border-l-2 border-gray-100 "></div>
        <GenreBut />
      </div>
    </div>
  );
}
