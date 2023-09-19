import { Button } from '@nextui-org/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'

import { OptionsIcon } from '../Icons/utility/option-icon'

import type { UserType } from '@/types/posts'

type OptionsDropdownProps = {
  author: UserType
  isFollowing: boolean
  toggleFollow: (authorId: string) => void
  showPublicButtons: boolean
  handleBlock: (authorId: string) => void
}

export default function OptionsDropdown({
  author,
  isFollowing,
  toggleFollow,
  showPublicButtons,
  handleBlock,
}: OptionsDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          radius="full"
          isIconOnly
          color="primary"
          variant="light"
          className="text-gray-500 hover:text-blue-600 z-30"
        >
          <OptionsIcon className="w-6 h-6" />
        </Button>
      </DropdownTrigger>
      {showPublicButtons ? (
        <DropdownMenu aria-label="Static Actions" className="text-white">
          <DropdownItem key="unfollow" onPress={() => toggleFollow(author.id)}>
            {isFollowing ? 'UnFollow' : 'Follow'} @{author.user_name}
          </DropdownItem>
          <DropdownItem key="block" onPress={() => handleBlock(author.id)}>
            Block @{author.user_name}
          </DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Static Actions" className="text-white">
          <DropdownItem key="delete">Delete Post</DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  )
}
