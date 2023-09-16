'use client'

import { Avatar } from '@nextui-org/avatar'
import { useSelector } from 'react-redux'

import OptionsDropdown from '@/components/post/post-options-dropdown'

import type { RootState } from '@/app/store'
import { PostType } from '@/types/posts'
import useFollow from '@/hooks/use-follow'

type Props = {
  postInfo: PostType
}

export default function PostPageMain({ postInfo }: Props) {
  const userData = useSelector((state: RootState) => state.auth.userData)
  const following = useSelector((state: RootState) => state.auth.following)

  const isFollowing = following?.includes(postInfo.author)
  const showPublicButtons = userData?.id !== postInfo.author.id

  const { toggleFollow } = useFollow()

  return (
    <div className="flex items-center justify-between">
      <div>
        <Avatar className="col-span-2" />
      </div>
      <OptionsDropdown
        author={postInfo.author}
        isFollowing={isFollowing}
        showPublicButtons={showPublicButtons}
        toggleFollow={toggleFollow}
        handleBlock={() => {}}
      />
    </div>
  )
}
