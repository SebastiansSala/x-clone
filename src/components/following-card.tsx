import Link from "next/link"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"

import type { UserType } from "../types/posts"

type FollowingCardProps = UserType & {}
const FollowingCard = ({ name, user_name, avatar_url }: FollowingCardProps) => {
  return (
    <li>
      <Link
        href={"/" + user_name}
        className='flex justify-between items-center cursor-pointer hover:bg-[#1d1f23] p-4 transition duration-250'
      >
        <div className='flex gap-4 items-center'>
          <Avatar src={avatar_url} />
          <div>
            <p className='text-white font-semibold'>{name}</p>
            <span>{user_name}</span>
          </div>
        </div>
        <Button
          color='default'
          className='bg-white hover:bg-gray-300 text-black'
        >
          Follow
        </Button>
      </Link>
    </li>
  )
}

export default FollowingCard
