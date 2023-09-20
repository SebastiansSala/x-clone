'use client'

import { UserType } from '@/types/posts'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = UserType & {
  isBlocked: boolean
  blockMutation: any
  user: UserType | null
}

export default function BlockedUsersCard({
  id,
  name,
  user_name,
  avatar_url,
  blockMutation,
  isBlocked,
  user,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFollow = async () => {
    try {
      setIsLoading(true)
      await blockMutation.mutateAsync({ user, blockedUserId: id })
    } catch (e) {
      console.error(e)
      toast.error('Error blocking user')
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
          {isLoading ? 'Loading' : 'Unblock'}
        </Button>
      </div>
    </li>
  )
}
