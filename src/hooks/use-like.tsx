"use client"

import { addLike } from "@/services/posts-services"
import { QueryClient, useMutation } from "react-query"

export default function useLike(postType: string) {
  const queryClient = new QueryClient()

  const likeMutation = useMutation(addLike, {
    onSuccess: (data, variables, context) => {
      const postId = context
      queryClient.refetchQueries(["posts", postType, postId])
    },
  })

  return {
    likeMutation,
  }
}
