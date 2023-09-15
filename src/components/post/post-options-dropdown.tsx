import type { User } from "@supabase/supabase-js";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

import { OptionsIcon } from "../Icons/utility/option-icon";

import type { UserType } from "@/types/posts";

type OptionsDropdownProps = {
  author: UserType;
  postId: string;
  isFollowing: boolean;
  onClick: (authorId: string) => void;
  showPublicButtons: boolean;
  handleBlock: (authorId: string) => void;
};

export default function OptionsDropdown({
  author,
  postId,
  isFollowing,
  onClick,
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
          <DropdownItem key="unfollow" onPress={() => onClick(author.id)}>
            {isFollowing ? "UnFollow" : "Follow"} @{author.user_name}
          </DropdownItem>
          <DropdownItem key="block" onPress={() => handleBlock(postId)}>
            Block @{author.user_name}
          </DropdownItem>
          <DropdownItem key="bookmark">Bookmark Post</DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Static Actions" className="text-white">
          <DropdownItem key="bookmark">Bookmark Post</DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
}
