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
}: ModalProps) => {
  return (
    <>
      {trigger}
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        className='bg-black text-white border-white border'
        backdrop='transparent'
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
