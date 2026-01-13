"use client";
import { Input } from "@/components/ui/input";

import { fetcherInput } from "@/utils/fetcherInput";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import { ArrowRight, Loader2Icon, X } from "lucide-react";
import Link from "next/link";
import { Movie } from "./Movies";

export const InputValue = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcherInput
  );
  const searchData = data?.results || [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="">
      <Input
        onChange={handleChange}
        placeholder="Search ..."
        value={searchValue}
        className="md:w-94.75 w-full md:border md:border-gray-200 border-0 pl-8"
      />

      {searchValue.length === 0 ? (
        <div hidden></div>
      ) : (
        <div className="border gap-4 p-5 flex flex-col border-solid  border-gray-200 rounded-lg md:w-144.25  absolute md:top-13 top-15 bg-white left-1/2 translate-x-[-50%] min-w-83.75 z-100">
          {isLoading ? (
            <div className="flex justify-center items-center md:w-144.25 ">
              <Loader2Icon />
            </div>
          ) : searchData.length > 0 ? (
            <>
              {searchData
                .map((searched: Movie) => (
                  <div className="flex gap-4 flex-col" key={searched.id}>
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <img
                          className="object-cover object-center h-25 w-16.75"
                          src={`https://image.tmdb.org/t/p/original${searched.poster_path}`}
                        />
                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="font-semibold md:text-[20px] text-[16px]">
                              {searched.title}
                            </div>
                            <div className=" flex items-center text-[14px] font-medium">
                              ⭐️{searched.vote_average}
                              <span className="text-[12px] opacity-50">
                                /10
                              </span>
                            </div>
                          </div>
                          <div className="font-medium md:text-[20px] text-[14px]">
                            {searched.release_date}
                          </div>
                        </div>
                      </div>
                      <div className="items-end flex shrink-0">
                        <Link
                          className="flex text-[14px] items-center justify-center gap-2 font-medium "
                          href={`/movieDetail?query=${searched.id}`}
                          onClick={() => setSearchValue("")}
                        >
                          See more{" "}
                          <ArrowRight className="w-4 h-4 flex text-[14px]" />
                        </Link>
                      </div>
                    </div>
                    <div className="border-b border-gray-300 border-solid"></div>
                  </div>
                ))
                .slice(0, 5)}
              <Link
                href={`/seeAllResult?searchValue=${searchValue}`}
                onClick={() => setSearchValue("")}
              >
                <div>See all results for "{searchValue}"</div>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-8">
              <p className="flex justify-center">No results found. </p>
              <Link
                href={`/seeAllResult?searchValue=${searchValue}`}
                onClick={() => setSearchValue("")}
              >
                <div>See all results for "{searchValue}"</div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
