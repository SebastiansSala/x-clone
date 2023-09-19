'use client'

import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Textarea } from '@nextui-org/input'
import Image from 'next/image'

import { RemoveIcon } from '../Icons/utility/remove-icon'

type PostModalBodyProps = {
  images: {
    dataURL: string
  }[]
  removeImage: (index: number) => void
  textarea: string
  handleTextAreaChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  avatar_url?: string
}

export default function CreatePostModalBody({
  images,
  removeImage,
  handleTextAreaChange,
  textarea,
  avatar_url,
}: PostModalBodyProps) {
  return (
    <div>
      <div className="grid grid-cols-12 items-center">
        <Avatar className="col-span-1" src={avatar_url} />
        <div className="col-span-11 px-10 grid bg-black">
          <Textarea
            placeholder="What is happening?!"
            className="text-white fill-black"
            onChange={(e) => handleTextAreaChange(e)}
            value={textarea}
          />
        </div>
      </div>
      {images.length > 0 && (
        <>
          {images.map((image, index) => (
            <div key={index} className="relative p-4">
              <Image
                src={image.dataURL}
                key={index}
                alt={image.dataURL}
                width={800}
                height={800}
                className="max-h-48 object-cover"
              />
              <Button
                isIconOnly
                radius="full"
                className="absolute top-2 right-2"
              >
                <RemoveIcon
                  className="h-4"
                  onClick={() => removeImage(index)}
                />
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
