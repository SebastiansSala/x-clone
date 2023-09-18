'use client'

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { useState } from 'react'
import type { ImageListType } from 'react-images-uploading'

import PostModalBody from './create-post-modal-body'
import PostModalFooter from './create-post-modal-footer'

import { createPost } from '@/services/posts-services'
import { Button } from '@nextui-org/button'
import PostIcon from '../Icons/utility/post-icon'

export default function CreatePostModal() {
  const [images, setImages] = useState([])
  const [textarea, setTextarea] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleImageUpload = (
    imagesList: ImageListType,
    addUpdatedIndex: number[] | undefined
  ) => {
    setImages(imagesList as never[])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (textarea.length > 280) return
    setTextarea(e.target.value)
  }

  const handleSubmit = async () => {
    const post = await createPost(textarea, images)

    if (!post) return
    onClose()
  }

  return (
    <>
      <Button
        className="bg-[#1d9bf0] absolute right-4 bottom-20 z-50 min-w-fit p-4 py-6 hover:bg-blue-500/95 xl:w-full text-white text-center rounded-full font-bold"
        onClick={onOpen}
      >
        <PostIcon className="h-4 w-4" />
        <span className="hidden xl:block">Post</span>
      </Button>

      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        className="bg-black text-white"
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <PostModalBody
              images={images}
              removeImage={removeImage}
              textarea={textarea}
              handleTextAreaChange={handleTextAreaChange}
            />
          </ModalBody>
          <ModalFooter>
            <PostModalFooter
              images={images}
              handleImageUpload={handleImageUpload}
              handleSubmit={handleSubmit}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
