"use client"

import Image from "next/image"
import clsx from "clsx"
import { Avatar } from "@nextui-org/avatar"
import { Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"

import CreatePostModalDropdown from "./craete-post-modal-dropdown"
import { RemoveIcon } from "../Icons/utility/remove-icon"

import getClassNameBasedOnImageCount from "@/utils/getClassNameBasedOnImageCount"

type PostModalBodyProps = {
  images: {
    dataURL: string
  }[]
  removeImage: (index: number) => void
  textarea: string
  handleTextAreaChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectedOption: (option: string) => void
  selectedOption: string
}

export default function CreatePostModalBody({
  images,
  removeImage,
  handleTextAreaChange,
  textarea,
  handleSelectedOption,
  selectedOption,
}: PostModalBodyProps) {
  return (
    <div>
      <div className='grid grid-cols-12 items-center'>
        <Avatar className='col-span-1' />
        <div className='col-span-11 px-10 grid bg-black'>
          <CreatePostModalDropdown
            handleSelectedOption={handleSelectedOption}
            selectedOption={selectedOption}
          />
          <Textarea
            placeholder='What is happening?!'
            className='text-black fill-black'
            onChange={(e) => handleTextAreaChange(e)}
            value={textarea}
          />
        </div>
      </div>
      {images.length > 0 && (
        <div className='grid grid-cols-2 grid-rows-2 items-center gap-4'>
          {images.map((image, index) => (
            <div
              key={index}
              className={clsx("relative", {
                [getClassNameBasedOnImageCount(images.length)]: true,
              })}
            >
              <Image
                src={image.dataURL}
                key={index}
                alt={image.dataURL}
                width={800}
                height={800}
                className='max-h-48 object-cover'
              />
              <Button
                isIconOnly
                radius='full'
                className='absolute top-2 right-2'
              >
                <RemoveIcon
                  className='h-4'
                  onClick={() => removeImage(index)}
                />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
