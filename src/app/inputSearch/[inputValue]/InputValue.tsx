"use client";

import { Input } from "@/components/ui/input";
import { Movie } from "@/app/components/Movies";
import { fetcherInput } from "@/utils/fetcherInput";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InputValue = () => {
  const [searchValue, setSearchValue] = useState("");
  const { push } = useRouter();
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcherInput
  );
  const searchData = data?.results || [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    push(`/?query=$${event.target.value}`);
  };

  return (
    <div>
      <Input onChange={handleChange} className="w-94.75 border-gray-300" />
      {searchValue.length === 0 ? (
        <div hidden></div>
      ) : (
        <div className="border gap-4 p-5 flex flex-col border-solid border-gray-200 rounded-lg w-138.25 z-10 absolute bg-gray-50">
          {searchData
            .map((searched: Movie) => (
              <div className="flex gap-4 flex-col">
                <div className="flex justify-between" key={searched.id}>
                  <div className="flex gap-4">
                    <img
                      className="object-cover object-center h-25 w-16.75 "
                      src={` https://image.tmdb.org/t/p/original${searched.poster_path}`}
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="font-semibold text-[20px]">
                          {searched.title}
                        </div>
                        <div className=" flex items-center text-[14px] font-medium">
                          ⭐️{searched.vote_average}
                          <span className="text-[12px] opacity-50">/10</span>
                        </div>
                      </div>
                      <div className="font-medium">{searched.release_date}</div>
                    </div>
                  </div>
                  <div className="items-end flex">
                    <Button>
                      See more <ArrowRight />
                    </Button>
                  </div>
                </div>
                <div className="border-b border-gray-300 border-solid"></div>
              </div>
            ))
            .slice(0, 5)}
          <div> See all results for "{searchValue}"</div>
        </div>
      )}
    </div>
  );
};
