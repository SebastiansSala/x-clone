"use client"

import Link from "next/link"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"

import type { UserType } from "../types/posts"

type FollowingCardProps = UserType & {
  toggleFollow: (authorId: string) => void
  isLoading: boolean
  isFollowing: boolean
}

const FollowingCard = ({
  id,
  name,
  user_name,
  avatar_url,
  toggleFollow,
  isLoading,
  isFollowing
}: FollowingCardProps) => {



  console.log(id, isFollowing)

  return (
    <li className='relative cursor-pointer hover:bg-[#1d1f23] transition duration-250'>
      <Link href={"/" + user_name} className='absolute z-0 h-full w-full' />
      <div className='z-50 flex justify-between items-center p-4'>
        <div className='flex gap-4 items-center'>
          <Avatar src={avatar_url} />
          <div>
            <p className='text-white font-semibold'>{name}</p>
            <span className='text-white'>{user_name}</span>
          </div>
        </div>
        <Button
          color='default'
          disabled={isLoading}
          onPress={() => toggleFollow(id)}
          className={`bg-white hover:bg-gray-300 text-black ${isLoading && "bg-gray-300"}`}
        >
          {isLoading ? "Loading" : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
    </li>
  )
}

export default FollowingCard
