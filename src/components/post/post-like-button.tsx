import { Button } from "@nextui-org/button";

import { LikeIcon } from "../Icons/utility/like-icon";

type LikeButtonProps = {
  onClick: () => void;
  likesCount: number;
  isLiked: boolean;
};

export default function LikeButton({
  onClick,
  likesCount,
  isLiked,
}: LikeButtonProps) {
  return (
    <>
      {isLiked ? (
        <Button
          radius="full"
          isIconOnly
          color="danger"
          variant="light"
          className="text-gray-500 hover:text-red-500 z-30"
          onPress={onClick}
        >
          <LikeIcon className="w-6 h-6 fill-red-500 " />
          {likesCount}
        </Button>
      ) : (
        <Button
          radius="full"
          isIconOnly
          color="danger"
          variant="light"
          className="text-gray-500 hover:text-red-500 z-30"
          onPress={onClick}
        >
          <LikeIcon className="w-6 h-6 " />
          {likesCount}
        </Button>
      )}
    </>
  );
}
