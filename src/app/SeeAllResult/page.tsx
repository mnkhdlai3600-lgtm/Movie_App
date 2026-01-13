"use client";

import { MovieResultsWrapper } from "@/components/MovieResultsWrapper";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MovieResultsWrapper />
    </Suspense>
  );
}
