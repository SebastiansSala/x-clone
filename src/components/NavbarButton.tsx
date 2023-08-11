"use client"

import clsx from "clsx"
import { Link } from "@nextui-org/link"
import { usePathname } from "next/navigation"

type NavbarLinkProps = {
  text?: string
  href: string
  icon: React.ReactNode
  filledIcon?: React.ReactNode
}
const NavbarLink = ({ text, href, icon, filledIcon }: NavbarLinkProps) => {
  const pathname = usePathname()
  const selectedLink = pathname.split("/").includes(href)

  return (
    <Link
      isBlock
      href={href}
      color='foreground'
      disableAnimation={false}
      className={clsx(
        "text-white text-xl hover:bg-slate-500 transition rounded-full flex gap-2 items-center w-fit px-2 justify-center text-center",
        selectedLink && "font-black"
      )}
    >
      <span className='mr-3'>{selectedLink ? filledIcon : icon}</span>
      {text}
    </Link>
  )
}

export default NavbarLink
