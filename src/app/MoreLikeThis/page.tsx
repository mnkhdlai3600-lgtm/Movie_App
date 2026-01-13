"use client";

import { Suspense } from "react";
import MoviesListWrapper from "../../components/MoviesListWrapper";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MoviesListWrapper />
    </Suspense>
  );
}
