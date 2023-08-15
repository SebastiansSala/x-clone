"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal"

type ModalProps = {
  trigger: React.ReactNode
  headerContent?: React.ReactNode
  bodyContent: React.ReactNode
  footerContent?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  backdrop: "transparent" | "opaque" | "blur"
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
}

const CustomModal = ({
  isOpen,
  onClose,
  trigger,
  headerContent,
  bodyContent,
  footerContent,
  size,
  backdrop,
}: ModalProps) => {
  return (
    <>
      {trigger}
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        className='bg-black text-white'
        backdrop={backdrop}
      >
        <ModalContent>
          <ModalHeader>{headerContent}</ModalHeader>
          <ModalBody>{bodyContent}</ModalBody>
          <ModalFooter>{footerContent}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal
