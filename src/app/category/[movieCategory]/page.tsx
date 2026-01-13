import { movieAPI } from "@/app/page";
import { Results } from "@/components/Movies";
import { DynamicPagination } from "@/components/PageInation";
import Link from "next/link";

export default async function category({
  params,
  searchParams,
}: {
  params: Promise<{ movieCategory: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { movieCategory } = await params;
  const currentPage = (await searchParams).page;

  const movies: Results = await movieAPI(movieCategory, currentPage);
  console.log(movies?.total_pages);

  const title = movieCategory.includes("popular")
    ? "Popular"
    : movieCategory.includes("upcoming")
    ? "Upcoming"
    : "Top rated";

  return (
    <div className="p-5 md:px-20 mb-12.5 gap-8 flex flex-col md:mx-40 mx-0">
      <p className="text-[24px] font-semibold">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 ">
        {movies.results.map((films) => {
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
                  <p className="text-[12px] md:text-[14px] flex items-center]">
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
        })}
      </div>
      <DynamicPagination />
    </div>
  );
}
