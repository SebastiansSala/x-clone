"use client"

import { Avatar } from "@nextui-org/avatar"
import CustomDropdown from "../CustomDropdown"
import { Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import clsx from "clsx"
import Image from "next/image"
import ButtonRemoveImage from "../Buttons/RemoveImageButton"
import { RemoveIcon } from "../Icons/PostActionsIcons"
import { PostImage } from "@/types/posts"

type PostModalBodyProps = {
  images: PostImage[]
  removeImage: (index: number) => void
  textarea: string
  handleTextAreaChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedOption: string
  setSelectedOption: (option: string) => void
}

const PostModalBody = ({
  images,
  removeImage,
  handleTextAreaChange,
  textarea,
  selectedOption,
  setSelectedOption,
}: PostModalBodyProps) => {
  const dropDowntrigger = (
    <Button color='primary' variant='light'>
      {selectedOption}
    </Button>
  )

  const visibilityOptions = ["Everyone", "Followers"]

  return (
    <div>
      <div className='grid grid-cols-12 items-center'>
        <Avatar className='col-span-1' />
        <div className='col-span-11 px-10 grid bg-black'>
          <CustomDropdown
            trigger={dropDowntrigger}
            options={visibilityOptions}
            setSelectedOption={setSelectedOption}
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
          <div
            className={clsx("relative", {
              "row-span-2 col-span-2": images.length === 1,
              "col-span-1 row-span-2":
                images.length === 2 || images.length === 3,
              "col-span-1 row-span-1": images.length === 4,
            })}
          >
            <Image
              src={images[0].dataURL}
              key={0}
              alt={images[0].dataURL}
              width={800}
              height={800}
              className='max-h-48 object-cover'
            />
            <ButtonRemoveImage onClick={() => removeImage(0)}>
              <RemoveIcon className='h-4' />
            </ButtonRemoveImage>
          </div>
          {images[1] && (
            <div
              className={clsx("relative", {
                "col-span-1 row-span-2": images.length === 2,
                "col-span-1 row-span-1": images.length > 2,
              })}
            >
              <Image
                src={images[1].dataURL}
                key={1}
                alt={images[1].dataURL}
                width={800}
                height={800}
                className='max-h-48 object-cover'
              />
              <ButtonRemoveImage onClick={() => removeImage(1)}>
                <RemoveIcon className='h-4' />
              </ButtonRemoveImage>
            </div>
          )}
          {images[2] && (
            <div className='relative col-span-1 row-span-1'>
              <Image
                src={images[2].dataURL}
                key={2}
                alt={images[2].dataURL}
                width={800}
                height={800}
                className='max-h-48 object-cover'
              />
              <ButtonRemoveImage onClick={() => removeImage(2)}>
                <RemoveIcon className='h-4' />
              </ButtonRemoveImage>
            </div>
          )}
          {images[3] && (
            <div className='relative col-span-1 row-span-1'>
              <Image
                src={images[3].dataURL}
                key={3}
                alt={images[3].dataURL}
                width={800}
                height={800}
                className='max-h-48 object-cover'
              />
              <ButtonRemoveImage onClick={() => removeImage(3)}>
                <RemoveIcon className='h-4' />
              </ButtonRemoveImage>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PostModalBody
