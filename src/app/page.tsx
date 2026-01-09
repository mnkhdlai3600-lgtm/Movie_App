import { Inter } from "next/font/google";
import { Movies } from "./components/Movies";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const movieAPI = async (category: string, page: string = "1") => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
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

export default async function Home() {
  const { results: upcomingMovie } = await movieAPI("upcoming");
  const { results: popularMovie } = await movieAPI("popular");
  const { results: topRatedMovie } = await movieAPI("top_rated");
  const { results: nowPlayingMovie } = await movieAPI("now_playing");

  return (
    <div className="flex flex-col items-center inter-">
      <div className={` w-screen ${inter.variable}`}>
        <Movies
          nowPlayingMovie={nowPlayingMovie}
          popularMovie={popularMovie}
          upcomingMovie={upcomingMovie}
          topRatedMovie={topRatedMovie}
        />
      </div>
    </div>
  );
}
