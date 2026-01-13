import Link from "next/link";
import { Movie } from "./Movies";
import { ArrowRight } from "lucide-react";

export const Upcoming = ({
  title,
  category,
  movieResults,
}: {
  title: string;
  movieResults: Movie[];
  category: string;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <p className="text-[24px] font-semibold">{title}:</p>
        <Link href={`/category/${category}`}>
          <button className="flex gap-2 justify-center items-center">
            See more <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8  ">
        {movieResults
          .map((films) => {
            return (
              <Link
                href={`/movieDetail?query=${films.id}`}
                key={films.id}
                className="rounded-lg overflow-hidden shadow-lg "
              >
                <img
                  className="object-cover object-center"
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
              </Link>
            );
          })
          .slice(0, 10)}
      </div>
    </div>
  );
};
