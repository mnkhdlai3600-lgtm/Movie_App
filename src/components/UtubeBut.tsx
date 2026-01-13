"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetcherInput } from "@/utils/fetcherInput";
import { Play } from "lucide-react";
import { usePathname } from "next/navigation";
import YouTube from "react-youtube";
import useSWR from "swr";

type UtubeButProps = {
  movieId: number;
};

export function UtubeBut({ movieId }: UtubeButProps) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
    fetcherInput
  );
  const pathname = usePathname();
  const trailerKey = data?.results?.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  )?.key;

  const opts = {
    height: "561",
    width: "1000",
    playerVars: { autoplay: 1 },
  };
  const optsRes = {
    height: "211",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  if (isLoading) return <p>Loading trailer...</p>;
  if (error) return <p>Failed to load trailer</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {pathname === "/" ? (
          <Button
            variant="secondary"
            disabled={!trailerKey}
            className="md:bg-white md:text-black bg-black text-white "
          >
            <Play className="mr-2" />
            Play trailer
          </Button>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <Button
              variant="secondary"
              disabled={!trailerKey}
              className="rounded-full bg-white w-10 h-10"
            >
              <Play className="" />
            </Button>
            <p className="text-white">Play trailer </p>
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="md:min-w-250 md:min-h-140.25 w-full h-50 border-none p-0 ">
        <DialogTitle></DialogTitle>
        {trailerKey ? (
          <>
            <div className="hidden md:block">
              <YouTube videoId={trailerKey} opts={opts} className="w-full" />
            </div>
            <div className="block md:hidden">
              <YouTube videoId={trailerKey} opts={optsRes} className="w-full" />
            </div>
          </>
        ) : (
          <p>No trailer available</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
