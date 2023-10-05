'use client'

import { Button } from '@nextui-org/button'
import ImageUploading, { ImageListType } from 'react-images-uploading'

import { ImageIcon } from '../Icons/utility/image-icon'

import { MAX_NUMBER_OF_IMAGES_ON_POSTS } from '@/const/posts'

type PostModalFooterProps = {
  images: any
  handleImageUpload: (
    imagesList: ImageListType,
    addUpdatedIndex: number[] | undefined
  ) => void
  handleSubmit: () => void
}

export default function CreatePostModalFooter({
  images,
  handleImageUpload,
  handleSubmit,
}: PostModalFooterProps) {
  return (
    <div className="flex justify-between w-full border-t-1 border-[#2f3336] pt-4">
      <div className="flex flex-1 gap-2 items-center">
        <ImageUploading
          multiple
          onChange={handleImageUpload}
          value={images}
          acceptType={['jpg', 'png', 'webp', 'jpeg']}
          maxNumber={MAX_NUMBER_OF_IMAGES_ON_POSTS}
        >
          {({ onImageUpload }) => (
            <ImageIcon
              className="text-blue-500 h-6 cursor-pointer"
              onClick={onImageUpload}
            />
          )}
        </ImageUploading>
      </div>
      <div>
        <Button color="primary" onPress={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  )
}
