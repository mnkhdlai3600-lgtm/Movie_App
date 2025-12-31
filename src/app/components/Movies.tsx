import category from "../category/[movieCategory]/page";
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
};

export type MovieCategory = "popular" | "upcoming" | "top_rated";

export const movieAPi = async (category: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${process.env.NEXT_PUBLIC_TDMB_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

type MoviesProps = {
  category: MovieCategory;
};

export const Movies = async () => {
  const { results: upcomingMovie } = await movieAPi("upcoming");
  const { results: popularMovie } = await movieAPi("popular");
  const { results: topRatedMovie } = await movieAPi("top_rated");

  return (
    <div className="flex justify-center flex-col">
      <div className="p-5 md:px-20 mb-12.5 gap-8 flex flex-col">
        <CarouselPlugin results={popularMovie} />
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
