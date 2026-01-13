"use client";
import { Suspense } from "react";
import MovieDetailWrapper from "@/components/ClientDetail";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MovieDetailWrapper />
    </Suspense>
  );
}
