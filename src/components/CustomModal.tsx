"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"

type ModalProps = {
  trigger: React.ReactNode
  headerContent: React.ReactNode
  bodyContent: React.ReactNode
  footerContent: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const CustomModal = ({
  isOpen,
  onClose,
  trigger,
  headerContent,
  bodyContent,
  footerContent,
}: ModalProps) => {
  return (
    <>
      {trigger}
      <Modal
        size='lg'
        isOpen={isOpen}
        onClose={onClose}
        className='bg-black text-white border-white border'
        backdrop='transparent'
      >
        <ModalContent>
          <ModalHeader>{headerContent}|</ModalHeader>
          <ModalBody>{bodyContent}</ModalBody>
          <ModalFooter>{footerContent}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal
