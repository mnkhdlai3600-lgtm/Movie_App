"use client";

import { Suspense } from "react";
import GenreMoviesWrapper from "../../components/ClientGenre";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GenreMoviesWrapper />
    </Suspense>
  );
}
