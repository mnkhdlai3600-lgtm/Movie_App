"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import GenreBut from "./GenreBut";

export function MovieGenre() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border border-gray-200">
          <ChevronDown />
          <span className="md:block hidden">Genres</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border-gray-50" align="start">
        <GenreBut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
