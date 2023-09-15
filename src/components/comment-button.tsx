import { Button } from "@nextui-org/button";

import { CommentIcon } from "./Icons/utility/comment-icon";

type CommentButtonProps = {
  onClick: () => void;
  commentsCount: number;
};

export default function CommentButton({
  onClick,
  commentsCount,
}: CommentButtonProps) {
  return (
    <Button
      radius="full"
      isIconOnly
      color="primary"
      variant="light"
      className="text-gray-500 hover:text-blue-500"
      onPress={onClick}
    >
      <CommentIcon className="w-6 h-6 " />
      {commentsCount}
    </Button>
  );
}
