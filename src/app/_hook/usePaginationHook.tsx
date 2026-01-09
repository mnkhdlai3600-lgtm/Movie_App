import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

type PaginationProps = {
  totalPage: number;
};

export const usePaginationHook = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const tenPages = 10;
  const maxButtons = 3;
  const currentPage = Number(searchParams.get("page") ?? 1);

  const handlePrevious = () => {};
  const handleNext = () => {};
  const HandleChange = (pageNumber: number) => () => {};

  return {
    router,
    pathName,
    searchParams,
    tenPages,
    handlePrevious,
    handleNext,
    HandleChange,
  };
};
