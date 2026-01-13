"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Movie } from "./Movies";
import Link from "next/link";
import { UtubeBut } from "./UtubeBut";

type CarouselPluginProps = {
  results: Movie[];
};

export const CarouselPlugin = ({ results }: CarouselPluginProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleOverview = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Carousel
      className="w-full relative"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {results.map((movie) => {
          const previewText =
            movie.overview.length > 100
              ? movie.overview.slice(0, 100) + "..."
              : movie.overview;

          return (
            <CarouselItem key={movie.id} className="md:relative">
              <Link href={`/movieDetail?query=${movie.id}`}>
                <img
                  className="w-screen md:max-h-200 object-cover object-center"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title}
                />
                <div className="hidden md:flex md:absolute md:z-50 md:top-[30%] md:right-[55%] md:left-[9%] md:text-white flex-col gap-4">
                  <div className="flex flex-col gap-4 md:mix-blend-difference">
                    <p className="text-[16px]">Now Playing</p>
                    <p className="text-4xl font-bold">{movie.original_title}</p>
                    <div className="flex">
                      <p className="font-semibold text-[18px]">
                        ⭐️{movie.vote_average}
                        <span className="font-normal opacity-50 text-[16px]">
                          /10
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="font-normal text-[12px]">{movie.overview}</p>
                </div>
                <div className="text-black md:hidden flex flex-col gap-4 p-5 md:p-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[14px]">Now Playing</p>
                      <p className="text-2xl font-bold">
                        {movie.original_title}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold text-[18px]">
                        ⭐️{movie.vote_average}
                        <span className="font-normal opacity-50 text-[16px]">
                          /10
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="font-normal text-[12px]">
                    {isExpanded ? movie.overview : previewText}{" "}
                    {movie.overview.length > 100 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleOverview();
                        }}
                        className="text-blue-500 font-semibold ml-1"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>
                </div>
              </Link>
              <div className="md:absolute z-50 md:top-[58%] md:left-[8%] static mx-5 flex justify-start items-end">
                <UtubeBut movieId={movie.id} />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="md:absolute z-20 hidden md:flex text-white md:w-10 md:h-10 left-10" />
      <CarouselNext className="md:absolute z-20 hidden md:flex text-white md:w-10 md:h-10 right-10" />
    </Carousel>
  );
};
