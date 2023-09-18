'use client'

import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { useState } from 'react'

import type { UserType } from '../types/posts'

type FollowingCardProps = UserType & {
  toggleFollow: (authorId: string) => Promise<void>
  isFollowing: boolean
}

const FollowingCard = ({
  id,
  name,
  user_name,
  avatar_url,
  toggleFollow,
  isFollowing,
}: FollowingCardProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFollow = async () => {
    try {
      setIsLoading(true)
      await toggleFollow(id)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <li className="relative cursor-pointer hover:bg-[#1d1f23] transition duration-250">
      <Link href={'/' + user_name} className="absolute z-0 h-full w-full" />
      <div className="z-50 flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <Avatar src={avatar_url} />
          <div>
            <p className="text-white font-semibold">{name}</p>
            <span className="text-white">{user_name}</span>
          </div>
        </div>
        <Button
          color="default"
          disabled={isLoading}
          onPress={() => handleToggleFollow()}
          className={`bg-white hover:bg-gray-300 text-black font-bold rounded-full ${
            isLoading && 'bg-gray-300'
          }`}
        >
          {isLoading ? 'Loading' : isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </li>
  )
}

export default FollowingCard
