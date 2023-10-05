'use client'

import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import PostModalBody from './create-post-modal-body'
import PostModalFooter from './create-post-modal-footer'

import { createPost } from '@/services/posts-services'
import PostIcon from '../Icons/utility/post-icon'

import type { RootState } from '@/app/store'
import type { ImageListType } from 'react-images-uploading'

export default function CreatePostModal() {
  const [images, setImages] = useState<ImageListType>([])
  const [textarea, setTextarea] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const userData = useSelector((state: RootState) => state.auth.userData)

  const supabase = createClientComponentClient()

  const handleImageUpload = (imagesList: ImageListType) => {
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
    const post = await createPost(textarea, images[0].dataURL, userData?.id)

    if (!post) return
    setTextarea('')
    setImages([])
    onClose()
  }

  return (
    <>
      <Button
        className="bg-[#1d9bf0] mx-auto right-4 absolute sm:left-2 sm:flex md:static sm:justify-center bottom-20 z-50 min-w-fit px-4 py-6 hover:bg-blue-500/95 xl:w-11/12 text-white text-center rounded-full font-bold w-fit"
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
          <ModalBody>
            <PostModalBody
              images={images}
              removeImage={removeImage}
              textarea={textarea}
              handleTextAreaChange={handleTextAreaChange}
              avatar_url={userData?.avatar_url}
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
