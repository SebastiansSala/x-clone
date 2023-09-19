'use client'

import { Avatar } from '@nextui-org/avatar'
import { Divider } from '@nextui-org/divider'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import OptionsDropdown from '@/components/post/post-options-dropdown'
import CommentList from '../comment-list'
import CommentsModal from '../comments-modal'
import LikeButton from '../like-button'
import RetweetButton from '../retweet-button'

import useFollow from '@/hooks/use-follow'

import type { RootState } from '@/app/store'
import type { PostType } from '@/types/posts'

type Props = {
  postInfo: PostType
}

export default function PostPageMain({ postInfo }: Props) {
  const userData = useSelector((state: RootState) => state.auth.userData)

  const showPublicButtons = userData?.id !== postInfo.author.id

  const { toggleFollow, getIsFollowing } = useFollow()

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
          handleBlock={() => {}}
        />
      </header>
      <div className="mt-4 px-6">
        <p>{postInfo.text}</p>
        {postInfo.image && (
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
        <div className="flex items-center justify-between">
          <CommentsModal
            commentsCount={postInfo.comments.length}
            author_avatarUrl={postInfo.author.avatar_url}
            author_name={postInfo.author.name}
            author_username={postInfo.author.user_name}
            post_description={postInfo.text}
            created_at={postInfo.createdAt}
            postId={postInfo.id}
          />
          <RetweetButton
            onClick={() => {}}
            retweetsCount={postInfo.retweets?.length}
            isRetweeted={false}
            isLoading={false}
          />
          <LikeButton
            onClick={() => {}}
            likesCount={postInfo.likes.length}
            isLiked={false}
            isLoading={false}
          />
        </div>
        <Divider className="bg-[#71767b] mt-2" />
      </section>

      <section>
        <CommentList
          postId={postInfo.id}
          postAuthorAvatar={postInfo.author.avatar_url}
        />
      </section>
    </section>
  )
}
