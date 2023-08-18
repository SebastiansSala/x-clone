import { Avatar } from "@nextui-org/avatar"
import React from "react"

type FollowingCardProps = {
  id: string
  name: string
  username: string
  avatar: string
}

const FollowingCard = ({ id, name, username, avatar }: FollowingCardProps) => {
  return (
    <li className='flex justify-between items-center'>
      <div className='flex gap-4 items-center'>
        <Avatar />
        <div>
          <p>{name}</p>
          <span>{username}</span>
        </div>
      </div>
      <button className='bg-white text-black rounded-full py-1 px-2'>
        Follow
      </button>
    </li>
  )
}

export default FollowingCard
