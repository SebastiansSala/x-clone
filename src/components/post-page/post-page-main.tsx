'use client'

import { Avatar } from '@nextui-org/avatar'
import { useSelector } from 'react-redux'
import Image from 'next/image'

import OptionsDropdown from '@/components/post/post-options-dropdown'

import type { RootState } from '@/app/store'
import { PostType } from '@/types/posts'
import useFollow from '@/hooks/use-follow'
import { Divider } from '@nextui-org/divider'
import CommentsModal from '../comments-modal/comments-modal'
import RetweetButton from '../retweet-button'
import LikeButton from '../like-button'
import { Input } from '@nextui-org/input'
import PostCard from '../post/post-card'

type Props = {
  postInfo: PostType
}

export default function PostPageMain({ postInfo }: Props) {
  const userData = useSelector((state: RootState) => state.auth.userData)
  const following = useSelector((state: RootState) => state.auth.following)

  const isFollowing = following?.includes(postInfo.author)
  const showPublicButtons = userData?.id !== postInfo.author.id

  const { toggleFollow } = useFollow()

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
    <section className="px-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="col-span-2" />
          <div>
            <h5>{postInfo.author.name}</h5>
            <h6>{postInfo.author.user_name}</h6>
          </div>
        </div>
        <OptionsDropdown
          author={postInfo.author}
          isFollowing={isFollowing}
          showPublicButtons={showPublicButtons}
          toggleFollow={toggleFollow}
          handleBlock={() => {}}
        />
      </header>
      <div className="mt-4">
        <p>{postInfo.text}</p>
        {postInfo.images.length > 0 && (
          <Image src={postInfo.images[0].url} alt={postInfo.images[0].url} />
        )}
        <div className="flex gap-4 text-[#71767b]">
          <p>
            {hour}:{isLessThanTen && '0'}
            {minutesCreated} {isPm ? 'PM' : 'AM'}
          </p>
          <p>{fullDate}</p>
        </div>
      </div>
      <Divider className="bg-[#71767b]" />
      <section className="mt-2">
        <div className="flex items-center justify-between">
          <CommentsModal
            commentsCount={postInfo.comments.length}
            author_avatarUrl={postInfo.author.avatar_url}
            author_name={postInfo.author.name}
            author_username={postInfo.author.user_name}
            post_description={postInfo.text}
            created_at={postInfo.createdAt}
          />
          <RetweetButton
            onClick={() => {}}
            retweetsCount={postInfo.retweets.length}
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
        <div className="grid grid-cols-12 py-6">
          <Avatar className="col-span-1" />
          <Input className="col-span-11" placeholder="Post your reply" />
        </div>
      </section>
      <section>
        <ul>
          {postInfo.comments.map((comment) => (
            <PostCard key={comment.id} post={comment} />
          ))}
        </ul>
      </section>
    </section>
  )
}
