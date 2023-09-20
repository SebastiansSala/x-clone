'use client'

import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Textarea } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import { CommentIcon } from './Icons/utility/comment-icon'

import formatDate from '@/utils/format-date'

import type { RootState } from '@/app/store'

type Props = {
  commentsCount: number
  author_avatarUrl: string
  author_name: string
  post_description: string
  created_at: Date
  author_username: string
  handleSubmit: (text: string) => void
}

export default function CommentsModal({
  commentsCount,
  author_avatarUrl,
  author_name,
  post_description,
  created_at,
  author_username,
  handleSubmit,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [textareaValue, setTextareaValue] = useState('')

  const date = formatDate(created_at)

  const userData = useSelector((state: RootState) => state.auth.userData)

  const handleReply = async (onClose: () => void) => {
    try {
      if (!textareaValue) return
      handleSubmit(textareaValue)
    } catch (e) {
      console.error(e)
    } finally {
      setTextareaValue('')
      onClose()
    }
  }

  return (
    <>
      <Button
        radius="full"
        isIconOnly
        color="primary"
        variant="light"
        className="text-gray-500 hover:text-blue-500 z-30"
        onPress={onOpen}
      >
        <CommentIcon className="w-6 h-6 " />
        {commentsCount}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-white">
          {(onClose) => (
            <>
              <ModalHeader className="grid grid-cols-12">
                <Avatar className="col-span-2" src={author_avatarUrl} />
                <div className="col-span-10">
                  <div className="flex gap-4 text-sm">
                    <p>{author_name}</p>
                    <p className="text-gray-400">@{author_username}</p>
                    <p className="text-gray-400">{date}</p>
                  </div>
                  <p className="text-sm">{post_description}</p>
                  <p className="text-sm">
                    Replying to
                    <Link href={''}>@{author_username}</Link>
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="grid grid-cols-12">
                <Avatar className="col-span-2" src={userData?.avatar_url} />
                <Textarea
                  placeholder="Post your reply!"
                  className="max-w-xs col-span-10"
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => handleReply(onClose)}
                  radius="full"
                  className="font-bold"
                >
                  Reply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
