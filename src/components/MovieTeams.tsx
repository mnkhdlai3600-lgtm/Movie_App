"use client";

import { fetcherInput } from "@/utils/fetcherInput";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function MovieTeams() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("query");

  const { data, isLoading, error } = useSWR(
    movieId
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`
      : null,
    fetcherInput
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading credits</div>;

  const directors = data?.crew?.filter((c: any) => c.job === "Director") || [];

  const writers =
    data?.crew?.filter((c: any) =>
      ["Writer", "Screenplay", "Story"].includes(c.job)
    ) || [];

  const stars = data?.cast?.slice(0, 5) || [];

  return (
    <div className="flex flex-col gap-5 text-sm text-gray-700">
      <div className="border-b-gray-300 border-b pb-2">
        {" "}
        <strong>Director:</strong>{" "}
        {directors.length
          ? directors.map((d: any) => d.name).join(", ")
          : "N/A"}
      </div>

      <div className="border-b-gray-300 border-b pb-2">
        <strong>Writers:</strong>{" "}
        {writers.length ? writers.map((w: any) => w.name).join(", ") : "N/A"}
      </div>

      <div className="border-b-gray-300 border-b pb-2">
        <strong>Stars:</strong>{" "}
        {stars.length ? stars.map((s: any) => s.name).join(", ") : "N/A"}
      </div>
    </div>
  );
}
