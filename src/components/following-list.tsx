import FollowingCard from "./following-card"

import type { UserType } from "@/types/posts"

export default function FollowingList({ users }: { users?: UserType[] }) {
  return (
    <ul className='bg-[#16181c] text-[#676b70] rounded-xl'>
      <li className='text-xl text-white pt-4 px-4 font-black'>
        What&apos;s happening
      </li>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <FollowingCard
          key={id}
          id={id}
          avatar_url={avatar_url}
          name={name}
          user_name={user_name}
        />
      ))}
      <li className='hover:bg-[#1d1f23] cursor-pointer transition duration-250 text-xl text-white p-4 rounded-b-xl font-black'>
        <a>Show More</a>
      </li>
    </ul>
  )
}
