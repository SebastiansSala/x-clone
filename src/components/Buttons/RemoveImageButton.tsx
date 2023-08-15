"use client"

import { Button } from "@nextui-org/button"

type RemoveImageButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

const ButtonRemoveImage: React.FC<RemoveImageButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      isIconOnly
      className='absolute top-2 right-2'
      radius='full'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ButtonRemoveImage
