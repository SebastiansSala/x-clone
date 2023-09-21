'use client'

import { Avatar } from '@nextui-org/avatar'
import { Divider } from '@nextui-org/divider'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import OptionsDropdown from '@/components/options-dropdown'
import CommentList from '../comment-list'
import CommentsModal from '../comments-modal'
import LikeButton from '../like-button'
import RetweetButton from '../retweet-button'

import useFollow from '@/hooks/use-follow'
import useActionHandlers from '@/hooks/use-actions-handlers'
import usePostActions from '@/hooks/use-post-actions'

import type { RootState } from '@/app/store'
import type { User } from '@supabase/supabase-js'
import usePost from '@/hooks/use-post'

type Props = {
  postId: string
  user?: User
}

export default function PostPageMain({ postId, user }: Props) {
  const userData = useSelector((state: RootState) => state.auth.userData)

  const { postInfo, isError, isLoading } = usePost(postId)

  const isLiked = postInfo
    ? postInfo.likes.some((like) => like.id === user?.id)
    : false

  const isRetweeted =
    postInfo && user && postInfo.retweets
      ? postInfo.retweets?.some((retweet) => retweet.authorId === user?.id)
      : false

  const {
    handleAddComment,
    handleLike,
    handleRetweet,
    handleBlock,
    isLikedLocal,
    isLikedloading,
    isRetweetLoading,
    isRetweetedLocal,
  } = useActionHandlers(isLiked, isRetweeted)

  const {
    addCommentMutation,
    addLikeMutation,
    addRetweetMutation,
    deleteRetweetMutation,
    deleteLikeMutation,
    blockMutation,
  } = usePostActions(postInfo?.id)

  const { toggleFollow, getIsFollowing } = useFollow()

  if (!postInfo) return null

  const showPublicButtons = userData?.id !== postInfo.authorId

  //get hours and minutes
  const hourCreated = new Date(postInfo.createdAt).getHours()
  const minutesCreated = new Date(postInfo.createdAt).getMinutes()

  const isLessThanTen = minutesCreated < 10

  const isPm = hourCreated > 12
  const hour = isPm ? hourCreated - 12 : hourCreated

  const fullDate = new Date(postInfo.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const handleReply = async (text: string) => {
    try {
      await handleAddComment(postInfo.id, text, addCommentMutation)
    } catch (err) {
      console.error(err)
    }
  }

  const toggleRetweet = async () => {
    handleRetweet(postInfo.id, addRetweetMutation, deleteRetweetMutation)
  }

  if (isError) return <p>Error</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <section>
      <header className="flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Avatar className="col-span-2" src={postInfo.author.avatar_url} />
          <div>
            <h5>{postInfo.author.name}</h5>
            <h6>{postInfo.author.user_name}</h6>
          </div>
        </div>
        <OptionsDropdown
          author={postInfo.author}
          isFollowing={getIsFollowing(postInfo.author.id)}
          showPublicButtons={showPublicButtons}
          toggleFollow={toggleFollow}
          handleBlock={() => {
            handleBlock(postInfo.author.id, blockMutation)
          }}
        />
      </header>
      <div className="mt-4 px-6">
        <p>{postInfo.text}</p>
        {postInfo.image && postInfo.image.url && (
          <Image src={postInfo.image?.url} alt={postInfo.image?.url} />
        )}
        <div className="flex gap-4 text-[#71767b]">
          <p>
            {hour}:{isLessThanTen && '0'}
            {minutesCreated} {isPm ? 'PM' : 'AM'}
          </p>
          <p>{fullDate}</p>
        </div>
      </div>

      <Divider className="bg-[#71767b] mt-4" />

      <section className="mt-2 px-6">
        <form className="flex items-center justify-between">
          <CommentsModal
            commentsCount={postInfo.comments.length}
            author_avatarUrl={postInfo.author.avatar_url}
            author_name={postInfo.author.name}
            author_username={postInfo.author.user_name}
            post_description={postInfo.text}
            created_at={postInfo.createdAt}
            handleSubmit={handleReply}
          />
          <RetweetButton
            onClick={toggleRetweet}
            retweetsCount={postInfo.retweets?.length}
            isRetweeted={isRetweetedLocal}
            isLoading={isRetweetLoading}
          />
          <LikeButton
            onClick={() => {
              handleLike(postInfo.id, addLikeMutation, deleteLikeMutation)
            }}
            likesCount={postInfo.likes.length}
            isLiked={isLikedLocal}
            isLoading={isLikedloading}
          />
        </form>
        <Divider className="bg-[#71767b] mt-2" />
      </section>
      <CommentList
        postId={postInfo.id}
        postAuthorAvatar={postInfo.author.avatar_url}
        userData={userData}
        user={user}
      />
    </section>
  )
}
