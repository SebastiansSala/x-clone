"use client"

import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/button"

import ArrowBackIcon from "../Icons/utility/arrow-back-icon"

export default function ArrowBackButton() {
  const router = useRouter()

  return (
    <Button
      isIconOnly
      radius='full'
      className='bg-transparent hover:bg-slate-500'
      onPress={() => router.back()}
    >
      <ArrowBackIcon className='h-4 w-4' />
    </Button>
  )
}
