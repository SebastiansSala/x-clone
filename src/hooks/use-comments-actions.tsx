'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import {
  createCommentRetweet,
  deleteCommentRetweet,
  likeComment,
  unlikeComment,
  createChildComment,
  createComment,
} from '@/services/comments-services'
import { blockUser } from '@/services/users-services'

import type { PostType, UserType } from '@/types/posts'
import { v4 } from 'uuid'

type CommentsObjectType = {
  pages: PageType[]
  pageParams: pageParams[]
}

type PageType = {
  nextId?: string
  comments: PostType[]
}

type pageParams = string | undefined

export default function useCommentsActions() {
  const queryClient = useQueryClient()

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
      await queryClient.cancelQueries(['comments'])
      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      const { user_name, name, avatar_url } = user

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: [
            ...page.comments,
            {
              id: v4(),
              parentId,
              text,
              user_name,
              name,
              avatar_url,
              comments: [],
              likes: [],
              retweets: [],
            },
          ],
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },

    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const addChildCommentMutation = useMutation(createChildComment, {
    onMutate: async ({
      user,
      text,
      parentId,
    }: {
      user: UserType
      text: string
      parentId: string
    }) => {
      await queryClient.cancelQueries(['comments'])
      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      const { user_name, name, avatar_url } = user

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                comments: [
                  ...comment.comments,
                  {
                    id: v4(),
                    parentId,
                    text,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              }
            }
            return comment
          }),
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const deleteLikeMutation = useMutation(unlikeComment, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])
      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            if (comment.id === postId) {
              return {
                ...comment,
                likes: comment.likes.filter((like) => like.id !== user.id),
              }
            }
            return comment
          }),
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const deleteLikeChildMutation = useMutation(unlikeComment, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])
      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            return {
              ...comment,
              comments: comment.comments.map((childComment) => {
                if (childComment.id === postId) {
                  return {
                    ...childComment,
                    likes: childComment.likes.filter(
                      (like) => like.id !== user.id
                    ),
                  }
                }
                return childComment
              }),
            }
          }),
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const addLikeChildMutation = useMutation(likeComment, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])
      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      const { id, user_name, name, avatar_url } = user

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            return {
              ...comment,
              comments: comment.comments.map((childComment) => {
                if (childComment.id === postId) {
                  return {
                    ...childComment,
                    likes: [
                      ...childComment.likes,
                      {
                        id,
                        user_name,
                        name,
                        avatar_url,
                      },
                    ],
                  }
                }
                return childComment
              }),
            }
          }),
        }))

        console.log(newData)

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const addLikeMutation = useMutation(likeComment, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])
      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      const { id, user_name, name, avatar_url } = user

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            if (comment.id === postId) {
              return {
                ...comment,
                likes: [
                  ...comment.likes,
                  {
                    id,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              }
            }
            return comment
          }),
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const addRetweetMutation = useMutation(createCommentRetweet, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])

      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      const { id, user_name, name, avatar_url } = user

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            if (comment.id === postId) {
              return {
                ...comment,
                retweets: [
                  ...comment.retweets!,
                  {
                    id,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              }
            }
            return comment
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const addChildRetweetMutation = useMutation(createCommentRetweet, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])

      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      const { id, user_name, name, avatar_url } = user

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            return {
              ...comment,
              comments: comment.comments.map((childComment) => {
                if (childComment.id === postId) {
                  return {
                    ...childComment,
                    retweets: [
                      ...childComment.retweets!,
                      {
                        id,
                        user_name,
                        name,
                        avatar_url,
                      },
                    ],
                  }
                }
                return childComment
              }),
            }
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },

    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const deleteChildRetweetMutation = useMutation(deleteCommentRetweet, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])

      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            return {
              ...comment,
              comments: comment.comments.map((childComment) => {
                if (childComment.id === postId) {
                  return {
                    ...childComment,
                    retweets: childComment.retweets!.filter(
                      (retweet) => retweet.authorId !== user.id
                    ),
                  }
                }
                return childComment
              }),
            }
          }),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },

    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const deleteRetweetMutation = useMutation(deleteCommentRetweet, {
    onMutate: async ({ postId, user }: { postId: string; user: UserType }) => {
      await queryClient.cancelQueries(['comments'])

      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.map((comment) => {
            if (comment.id === postId) {
              return {
                ...comment,
                retweets: comment.retweets!.filter(
                  (retweet) => retweet.authorId !== user.id
                ),
              }
            }
            return comment
          }),
        }))

        return {
          ...oldData,
          pages: newData,
        }
      })

      return { oldData }
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
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
      await queryClient.cancelQueries(['comments'])

      const oldData = queryClient.getQueryData<CommentsObjectType>(['comments'])

      queryClient.setQueryData(['comments'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          comments: page.comments.filter(
            (post) => post.author.id !== blockedUserId
          ),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['comments'], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  return {
    addLikeMutation,
    deleteLikeMutation,
    addRetweetMutation,
    deleteRetweetMutation,
    blockMutation,
    addCommentMutation,
    addLikeChildMutation,
    deleteLikeChildMutation,
    addChildRetweetMutation,
    deleteChildRetweetMutation,
    addChildCommentMutation,
  }
}
