"use client"

import { useDisclosure } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import CustomModal from "./CustomModal"
import Logo from "./Icons/Logo"
import { Avatar } from "@nextui-org/avatar"

const PostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const trigger = (
    <button
      className='bg-[#1d9bf0] hover:bg-blue-500/95 w-full text-white text-center py-4 rounded-full'
      onClick={onOpen}
    >
      Post
    </button>
  )

  const bodyContent = (
    <>
      <div className='grid-cols-12'>
        <Avatar className='col-span-1' />
        <input
          placeholder='What is happening?!'
          className='outline-none col-span-11 text-xl text-white bg-transparent'
        />
      </div>
      <div></div>
    </>
  )

  const footerContent = (
    <div className='flex justify-between w-full border-t-1 border-[#2f3336] pt-4'>
      <div>
        <Button color='danger' variant='light' onClick={onClose}>
          Close
        </Button>
      </div>
      <div>
        <Button color='primary' onPress={onClose}>
          Post
        </Button>
      </div>
    </div>
  )

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
      bodyContent={bodyContent}
      footerContent={footerContent}
      size='lg'
    />
  )
}

export default PostModal
