"use client"

import { useDisclosure } from "@nextui-org/modal"
import CustomModal from "../CustomModal"
import { useState } from "react"
import PostModalBody from "./PostModalBody"
import PostModalFooter from "./PostModalFooter"
import PostModalTrigger from "./PostModalTrigger"
import { createPost } from "@/services/posts"
import { PostImage } from "@/types/posts"

const PostModal = () => {
  const [images, setImages] = useState<PostImage[]>([])
  const [textarea, setTextarea] = useState("")
  const [selectedOption, setSelectedOption] = useState("Everyone")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleImageUpload = (
    imagesList: PostImage[],
    addUpdatedIndex: number
  ) => {
    setImages(imagesList)
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (textarea.length > 280) return
    setTextarea(e.target.value)
  }

  const handleSubmit = () => {
    const post = createPost(textarea, selectedOption, images)
    console.log(post)
    if (!post) return
    onClose()
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      trigger={<PostModalTrigger onOpen={onOpen} />}
      bodyContent={
        <PostModalBody
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          images={images}
          removeImage={removeImage}
          handleTextAreaChange={handleTextAreaChange}
          textarea={textarea}
        />
      }
      footerContent={
        <PostModalFooter
          images={images}
          handleImageUpload={handleImageUpload}
          handleSubmit={handleSubmit}
        />
      }
      backdrop='blur'
      size='lg'
    />
  )
}

export default PostModal
