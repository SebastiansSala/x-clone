'use client'

import { v4 as uuidv4 } from 'uuid'
import { useMutation, useQueryClient } from 'react-query'

import {
  createRetweet,
  deleteRetweet,
  likePost,
  unlikePost,
} from '@/services/posts-services'
import { blockUser } from '@/services/users-services'

import type { PostTypeWithAllActions, UserType } from '@/types/posts'
import { createComment } from '@/services/comments-services'

type PostObjectType = {
  pages: PageType[]
  pageParams: pageParams[]
}

type PageType = {
  nextId?: string
  posts: PostTypeWithAllActions[]
}

type pageParams = string | undefined

export default function usePostActions(postType?: string) {
  const queryClient = useQueryClient()

  const deleteLikeMutation = useMutation(unlikePost, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['posts', postType])

      const oldData = queryClient.getQueryData<PostObjectType>([
        'posts',
        postType,
      ])

      queryClient.setQueryData(['posts', postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: post.likes.filter((like) => like.id !== user.id),
              }
            }
            return post
          }),
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postType], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postType])
    },
  })

  const addLikeMutation = useMutation(likePost, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['posts', postType])

      const oldData = queryClient.getQueryData<PostObjectType>([
        'posts',
        postType,
      ])

      const { id, user_name, name, avatar_url } = user

      queryClient.setQueryData(['posts', postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: [
                  ...post.likes,
                  {
                    id,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              }
            }
            return post
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postType], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postType])
    },
  })

  const addRetweetMutation = useMutation(createRetweet, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['posts', postType])

      const oldData = queryClient.getQueryData<PostObjectType>([
        'posts',
        postType,
      ])

      const { id, user_name, name, avatar_url } = user

      queryClient.setQueryData(['posts', postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                retweets: [
                  ...post.retweets!,
                  {
                    id: uuidv4(),
                    authorId: user.id,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              }
            }
            return post
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postType], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postType])
    },
  })

  const deleteRetweetMutation = useMutation(deleteRetweet, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['posts', postType])

      const oldData = queryClient.getQueryData<PostObjectType>([
        'posts',
        postType,
      ])

      queryClient.setQueryData(['posts', postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                retweets: post.retweets!.filter(
                  (retweet) => retweet.authorId !== user.id
                ),
              }
            }
            return post
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postType], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postType])
    },
  })

  const blockMutation = useMutation(blockUser, {
    onMutate: async ({
      user,
      blockedUserId,
    }: {
      user: UserType
      blockedUserId: string
    }) => {
      await queryClient.cancelQueries(['posts', postType])

      const oldData = queryClient.getQueryData<PostObjectType>([
        'posts',
        postType,
      ])

      queryClient.setQueryData(['posts', postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.filter((post) => post.author.id !== blockedUserId),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postType], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postType])
    },
  })

  const addCommentMutation = useMutation(createComment, {
    onMutate: async ({
      user,
      text,
      parentId,
    }: {
      user: UserType
      text: string
      parentId: string
    }) => {
      await queryClient.cancelQueries(['posts', postType])

      const oldData = queryClient.getQueryData<PostObjectType>([
        'posts',
        postType,
      ])

      queryClient.setQueryData(['posts', postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === parentId) {
              return {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: uuidv4(),
                    text,
                  },
                ],
              }
            }
            return post
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postType], context)
    },

    onSettled: () => {
      queryClient.invalidateQueries(['posts', postType])
    },
  })

  return {
    addLikeMutation,
    deleteLikeMutation,
    addRetweetMutation,
    deleteRetweetMutation,
    blockMutation,
    addCommentMutation,
  }
}
