"use client"

import { useState, useEffect } from "react"
import { Link } from "@nextui-org/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

type NavbarLinkProps = {
  text?: string
  href: string
  icon?: React.ReactNode
}
const NavbarLink = ({ text, href, icon }: NavbarLinkProps) => {
  const pathname = usePathname()
  const [selected] = useState(pathname.split("/").includes(href))

  return (
    <Link
      isBlock
      href={href}
      color='foreground'
      disableAnimation={false}
      className={clsx(
        "text-white text-xl hover:bg-slate-500 transition rounded-full flex gap-2 items-center w-fit px-2 justify-center text-center",
        selected && "font-black"
      )}
    >
      <span className='mr-3'>{icon}</span>
      {text}
    </Link>
  )
}

export default NavbarLink
