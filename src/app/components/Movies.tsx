"use client";

import { CarouselPlugin } from "./Carousel";
import { Upcoming } from "./Upcoming";
export type Movie = {
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  release_date: number;
  genre_ids: number;
};

export type Results = {
  results: Movie[];
  total_pages: number;
};

export type MovieCategory =
  | "popular"
  | "upcoming"
  | "top_rated"
  | "now_playing";

type MoviesProps = {
  popularMovie: Movie[];
  nowPlayingMovie: Movie[];
  topRatedMovie: Movie[];
  upcomingMovie: Movie[];
};

export const Movies = ({
  popularMovie,
  nowPlayingMovie,
  topRatedMovie,
  upcomingMovie,
}: MoviesProps) => {
  return (
    <div>
      <CarouselPlugin results={nowPlayingMovie} />
      <div className="p-5 md:px-40 mb-12.5 gap-8 flex flex-col">
        {" "}
        <Upcoming
          title="Upcoming"
          movieResults={popularMovie}
          category="upcoming"
        />
        <Upcoming
          title="Top Rated"
          movieResults={topRatedMovie}
          category="top_rated"
        />
        <Upcoming
          title="Popular"
          movieResults={upcomingMovie}
          category="popular"
        />
      </div>
    </div>
  );
};
