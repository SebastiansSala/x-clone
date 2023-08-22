"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"
import { Button } from "@nextui-org/button"

import Logo from "./Icons/social/logo-icon"

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        className='text-[#1d9bf0] text-center mt-4 w-full bg-transparent border'
        onPress={onOpen}
      >
        Sign in
      </Button>
      <Modal
        size='xl'
        isOpen={isOpen}
        onClose={onClose}
        className='bg-black text-white'
        backdrop='blur'
      >
        <ModalContent>
          <ModalHeader>
            <Logo className='h-6 mx-auto fill-white' />
          </ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onClick={onClose}>
              Close
            </Button>
            <Button color='primary' onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
