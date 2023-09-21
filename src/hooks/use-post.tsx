import { useQuery } from 'react-query'

import { fetchPost } from '@/services/posts-services'
import { PostTypeWithAllActions } from '@/types/posts'

export default function usePost(postId: string) {
  const {
    data: postInfo,
    isLoading,
    isError,
  } = useQuery<PostTypeWithAllActions>(['posts', postId], () =>
    fetchPost(postId)
  )

  return {
    postInfo,
    isLoading,
    isError,
  }
}
