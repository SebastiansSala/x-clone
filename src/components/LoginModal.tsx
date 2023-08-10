"use client"

import { useDisclosure } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import CustomModal from "./CustomModal"
import Logo from "./Icons/Logo"

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const trigger = (
    <Button
      className='text-[#1d9bf0] text-center mt-4 w-full bg-transparent border'
      onPress={onOpen}
    >
      Sign in
    </Button>
  )

  const headerContent = <Logo height='h-6 mx-auto' />

  const bodyContent = (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
        risus, sed porttitor quam.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
        risus, sed porttitor quam.
      </p>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod.
      </p>
    </>
  )

  const footerContent = (
    <>
      <Button color='danger' variant='light' onClick={onClose}>
        Close
      </Button>
      <Button color='primary' onPress={onClose}>
        Action
      </Button>
    </>
  )

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
      headerContent={headerContent}
      bodyContent={bodyContent}
      footerContent={footerContent}
    />
  )
}

export default LoginModal
