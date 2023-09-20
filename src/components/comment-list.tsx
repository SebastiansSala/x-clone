'use client'

import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Spinner } from '@nextui-org/spinner'
import { useEffect, useState } from 'react'

import useCommentsActions from '@/hooks/use-comments-actions'
import useFollow from '@/hooks/use-follow'
import useInfiniteComments from '@/hooks/use-infinite-comments'
import toast from 'react-hot-toast'

import CommentCard from './comment-card'

import { createComment } from '@/services/comments-services'

import type { UserType } from '@/types/posts'
import type { User } from '@supabase/supabase-js'

export default function CommentList({
  postId,
  postAuthorAvatar,
  userData,
  user,
}: {
  postId: string
  postAuthorAvatar: string
  userData: UserType | null
  user?: User
}) {
  const { comments, isLoading, isFetchingNextPage, error, ref, isError } =
    useInfiniteComments(postId, user?.id)

  const [input, setInput] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const {
    addLikeMutation,
    deleteLikeMutation,
    deleteRetweetMutation,
    addRetweetMutation,
    blockMutation,
    addCommentMutation,
    addLikeChildMutation,
    deleteLikeChildMutation,
    addChildRetweetMutation,
    deleteChildRetweetMutation,
    addChildCommentMutation,
  } = useCommentsActions()

  const { toggleFollow, getIsFollowing } = useFollow()

  const handleSubmit = async () => {
    try {
      if (!input) return
      if (!userData) return
      setIsDisabled(true)
      await createComment({
        postId,
        user: userData,
        text: input,
      })
    } catch (e) {
      console.error(e)
      toast.error('Error creating comment')
    } finally {
      setInput('')
      setIsDisabled(false)
    }
  }

  useEffect(() => {
    if (input.length === 0) setIsDisabled(true)
    if (input.length > 0) setIsDisabled(false)
  }, [input])

  if (isLoading)
    return (
      <div className="h-full w-full grid place-content-center py-20">
        <Spinner color="default" size="lg" className="text-center mx-auto" />
      </div>
    )
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <>
      <div className="grid grid-cols-12 py-6 gap-2 px-6">
        <Avatar className="col-span-1" src={postAuthorAvatar} />
        <Input
          className="col-span-9"
          placeholder="Post your reply"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="col-span-2"
          color="primary"
          isDisabled={isDisabled}
          onClick={handleSubmit}
        >
          Reply
        </Button>
      </div>

      <ul>
        {comments?.map((comment) => {
          const isFollowing = getIsFollowing(comment.authorId)

          const isRetweeted =
            user && comment.retweets
              ? comment.retweets?.some(
                  (retweet) => retweet.authorId === user.id
                )
              : false

          const isLiked =
            user && comment.likes
              ? comment.likes.some((like) => like.id === user.id)
              : false

          return (
            <article
              key={comment.id}
              className="border-y-1 border-[#71767b] px-2"
            >
              <CommentCard
                key={comment.id}
                comment={comment}
                toggleFollow={toggleFollow}
                isFollowing={isFollowing}
                isRetweeted={isRetweeted}
                isLiked={isLiked}
                addLikeMutation={addLikeMutation}
                deleteLikeMutation={deleteLikeMutation}
                addRetweetMutation={addRetweetMutation}
                deleteRetweetMutation={deleteRetweetMutation}
                blockMutation={blockMutation}
                addCommentMutation={addCommentMutation}
              />
              {comment.comments &&
                comment.comments.slice(0, 2).map((childComment) => {
                  const isFollowing = getIsFollowing(comment.authorId)

                  const isRetweeted =
                    user && childComment.retweets
                      ? childComment.retweets?.some(
                          (retweet) => retweet.authorId === user.id
                        )
                      : false

                  const isLiked =
                    user && childComment.likes
                      ? childComment.likes.some((like) => like.id === user.id)
                      : false

                  return (
                    <CommentCard
                      key={childComment.id}
                      comment={childComment}
                      toggleFollow={toggleFollow}
                      isFollowing={isFollowing}
                      isRetweeted={isRetweeted}
                      isLiked={isLiked}
                      addLikeMutation={addLikeChildMutation}
                      deleteLikeMutation={deleteLikeChildMutation}
                      addRetweetMutation={addChildRetweetMutation}
                      deleteRetweetMutation={deleteChildRetweetMutation}
                      blockMutation={blockMutation}
                      addCommentMutation={addChildCommentMutation}
                    />
                  )
                })}
            </article>
          )
        })}
        {isFetchingNextPage ? (
          <div className="py-14 grid place-content-center">
            <Spinner color="default" size="lg" />
          </div>
        ) : null}
        <span ref={ref} style={{ visibility: 'hidden' }} />
      </ul>
    </>
  )
}
