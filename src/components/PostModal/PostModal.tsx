"use client"

import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal"
import { useState } from "react"
import PostModalBody from "./PostModalBody"
import PostModalFooter from "./PostModalFooter"
import { createPost } from "@/services/posts-services"
import type { ImageListType } from "react-images-uploading"

const PostModal = () => {
  const [images, setImages] = useState([])
  const [textarea, setTextarea] = useState("")
  const [selectedOption, setSelectedOption] = useState("Everyone")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleImageUpload = (
    imagesList: ImageListType,
    addUpdatedIndex: number[] | undefined
  ) => {
    console.log(imagesList)
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
    const post = await createPost(textarea, selectedOption, images)
    console.log(post)
    if (!post) return
    onClose()
  }

  return (
    <>
      <button
        className='bg-[#1d9bf0] hover:bg-blue-500/95 w-full text-white text-center py-4 rounded-full'
        onClick={onOpen}
      >
        Post
      </button>
      <Modal
        size='lg'
        isOpen={isOpen}
        onClose={onClose}
        backdrop='blur'
        className='bg-black text-white'
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <PostModalBody
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              images={images}
              removeImage={removeImage}
              handleTextAreaChange={handleTextAreaChange}
              textarea={textarea}
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

export default PostModal
