"use client"

import { useInfiniteQuery } from "react-query"

export default function useInfinite(
  cacheKey: string[],
  fetchFn: (pageParam: number) => any
) {
  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(cacheKey, ({ pageParam = 0 }) => fetchFn(pageParam), {
    getNextPageParam: (lastPage) => lastPage.nextId,
  })

  return {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
