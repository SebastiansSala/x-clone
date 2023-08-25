import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"

import { OptionsIcon } from "./Icons/utility/option-icon"

import type { UserType } from "@/types/posts"

type OptionsDropdownProps = {
  author: UserType
  isFollowing: boolean | undefined
  onClick: (authorId: string) => void
}

export default function OptionsDropdown({
  author,
  isFollowing,
  onClick,
}: OptionsDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          radius='full'
          isIconOnly
          color='primary'
          variant='light'
          className='text-gray-500 hover:text-blue-600'
        >
          <OptionsIcon className='w-6 h-6' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions' className='text-white'>
        <DropdownItem key='unfollow' onPress={() => onClick(author.id)}>
          {isFollowing ? "UnFollow" : "Follow"} @{author.user_name}
        </DropdownItem>
        <DropdownItem key='block'>Block @{author.user_name}</DropdownItem>
        <DropdownItem key='bookmark'>Bookmark Post</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
