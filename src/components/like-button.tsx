import { Button } from '@nextui-org/button'

import { LikeIcon } from './Icons/utility/like-icon'

type LikeButtonProps = {
  onClick: () => void
  likesCount?: number
  isLiked: boolean
  isLoading: boolean
}

export default function LikeButton({
  onClick,
  likesCount = 0,
  isLiked,
  isLoading,
}: LikeButtonProps) {
  return (
    <Button
      radius="full"
      isIconOnly
      isDisabled={isLoading}
      color="danger"
      variant="light"
      className={`text-gray-500 hover:text-red-500 z-30`}
      onPress={onClick}
    >
      <LikeIcon className={`w-6 h-6 ${isLiked && 'fill-red-500'} `} />
      {likesCount}
    </Button>
  )
}
