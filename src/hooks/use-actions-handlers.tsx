'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'

export default function useActionHandlers(
  isLiked: boolean,
  isRetweeted: boolean
) {
  const [isLikedLocal, setIsLikedLocal] = useState(isLiked)
  const [isRetweetedLocal, setIsRetweetedLocal] = useState(isRetweeted)

  const [isLikedloading, setIsLikedLoading] = useState(false)
  const [isRetweetLoading, setIsRetweetLoading] = useState(false)

  const user = useSelector((state: RootState) => state.auth.userData)

  async function handleLike(
    id: string,
    isLiked: boolean,
    addLikeMutation: any,
    deleteLikeMutation: any
  ) {
    try {
      if (!user) {
        setIsLikedLocal(!isLikedLocal)
        toast.error('You must be logged in to block a user')
        return
      }
      setIsLikedLocal(!isLikedLocal)
      setIsLikedLoading(true)
      if (isLiked) {
        await deleteLikeMutation.mutateAsync({ postId: id, user: user })
      } else {
        await addLikeMutation.mutateAsync({ postId: id, user: user })
      }
    } catch (err) {
      console.error(err)
      setIsLikedLocal(!isLikedLocal)
    } finally {
      setIsLikedLoading(false)
    }
  }

  async function handleRetweet(
    id: string,
    isRetweeted: boolean,
    addRetweetMutation: any,
    deleteRetweetMutation: any
  ) {
    try {
      if (!user) {
        setIsRetweetedLocal(!isRetweetedLocal)
        toast.error('You must be logged in to retweet a post')
        return
      }

      setIsRetweetLoading(true)
      if (isRetweeted) {
        setIsRetweetedLocal(!isRetweetedLocal)
        await deleteRetweetMutation.mutateAsync({ postId: id, user: user })
      } else {
        setIsRetweetedLocal(!isRetweetedLocal)
        await addRetweetMutation.mutateAsync({ postId: id, user: user })
      }
    } catch (e) {
      console.error(e)
      setIsRetweetedLocal(!isRetweetedLocal)
    } finally {
      setIsRetweetLoading(false)
    }
  }

  async function handleBlock(authorId: string, blockMutation: any) {
    try {
      if (!user) return toast.error('You must be logged in to block a user')
      await blockMutation.mutateAsync({
        user: user,
        blockedUserId: authorId,
      })
      toast.success('User blocked successfully')
    } catch (err) {
      console.error(err)
      toast.error('Error blocking user')
    }
  }

  async function handleAddComment(
    parentId: string,
    text: string,
    commentMutation: any
  ) {
    try {
      if (!user) return toast.error('You must be logged in to comment')
      await commentMutation.mutateAsync({
        user: user,
        text: text,
        parentId: parentId,
      })

      toast.success('Comment created successfully')
    } catch (err) {
      console.error(err)
      toast.error('Error creating comment')
    }
  }

  return {
    handleLike,
    handleRetweet,
    handleBlock,
    isLikedLocal,
    isRetweetedLocal,
    isLikedloading,
    isRetweetLoading,
    handleAddComment,
  }
}
