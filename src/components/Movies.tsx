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
    <div className="md:flex flex-col gap-13 ">
      <CarouselPlugin results={nowPlayingMovie} />
      <div className="md:px-40 flex flex-col gap-13 px-5">
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
