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

export default function CreatePostModal() {
  const [images, setImages] = useState([])
  const [textarea, setTextarea] = useState('')
  const [selectedOption, setSelectedOption] = useState('Everyone')
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

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option)
  }

  const handleSubmit = async () => {
    const post = await createPost(textarea, selectedOption, images)

    if (!post) return
    onClose()
  }

  return (
    <>
      <div className="flex justify-center">
        <Button
          isIconOnly
          className="xl:hidden mx-auto"
          color="primary"
          radius="full"
        ></Button>
      </div>

      <Button
        className="bg-[#1d9bf0] hover:bg-blue-500/95 xl:block hidden xl:w-full text-white text-center p-2 rounded-full"
        onClick={onOpen}
      >
        Post
      </Button>
      <div></div>
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
              selectedOption={selectedOption}
              handleSelectedOption={handleSelectedOption}
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
