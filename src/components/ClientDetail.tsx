"use client";

import { Badge } from "@/components/ui/badge";
import { fetcherInput } from "@/utils/fetcherInput";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { UtubeBut } from "./UtubeBut";
import MovieTeams from "./MovieTeams";
import Similiar from "./Similiar";
import RespoDetail from "./RespoDetail";

export default function MovieDetailWrapper() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("query");

  const { data, error, isLoading } = useSWR(
    movieId
      ? [
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}?language=en-US`,
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`,
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
        ]
      : null,
    (urls: string[]) => Promise.all(urls.map(fetcherInput))
  );

  const [movieData = {}, creditsData = {}, videosData = {}] = data || [];

  const trailerKey = videosData?.results?.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  )?.key;

  const trailer = videosData?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie</p>;

  return (
    <div className="px-5 md:px-10 py-5 md:mx-45">
      <div className="hidden md:flex flex-col gap-8">
        <div className="flex flex-row justify-between md:items-center gap-4">
          <div>
            <p className="font-bold md:text-4xl text-2xl">{movieData?.title}</p>
            <p className="text-lg mt-1 text-gray-600">
              {movieData?.release_date} | {Math.floor(movieData?.runtime / 60)}h{" "}
              {movieData?.runtime % 60}m
            </p>
          </div>
          <div className="text-right">
            <p className="text-[12px] font-medium text-gray-500">Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400 text-xl">⭐️</span>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {movieData?.vote_average}
                  <span className="text-gray-400">/10</span>
                </p>
                <p className="text-gray-400 text-[12px]">
                  {movieData?.vote_count} votes
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 md:gap-0">
          <div className="flex gap-8 w-full md:flex-row flex-col-reverse">
            <img
              className="w-2/8 object-cover rounded-lg shadow-md"
              src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
              alt="Poster"
            />
            {trailer ? (
              <div className="w-full md:w-4/6 object-center object-cover">
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`}
                    className="h-full"
                  />
                  <div className="bg-black opacity-50 w-full h-full z-10 absolute top-0"></div>
                  <div className="absolute bottom-6 z-20 left-6 ">
                    {trailerKey && <UtubeBut movieId={movieData.id} />}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-160 h-60 md:h-96 flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-500">No trailer available</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {movieData?.genres?.map((g: any) => (
            <Link key={g.id} href={`/genres?genre=${g.id}`}>
              <Badge variant="outline" className="border-gray-300">
                {g.name}
              </Badge>
            </Link>
          ))}
        </div>
        <p className="text-gray-700 text-base">{movieData?.overview}</p>
        <MovieTeams />
        <Similiar />
      </div>

      <div className="block md:hidden">
        <RespoDetail />
      </div>
    </div>
  );
}
