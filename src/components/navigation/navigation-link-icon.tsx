"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Link } from "@nextui-org/link"

type NavigationLinkProps = {
  href: string
  icon: React.ReactNode
  filledIcon?: React.ReactNode
}
export default function NavigationLinkIcon({
  href,
  icon,
  filledIcon,
}: NavigationLinkProps) {
  const pathname = usePathname()

  const selectedLink = pathname.split("/").includes(href)

  return (
    <Link
      isBlock
      href={href}
      color='foreground'
      disableAnimation={false}
      className={clsx(
        "text-white text-xl hover:bg-slate-500 transition rounded-full flex gap-2 items-center w-fit p-2 justify-center text-center",
        selectedLink && "font-black"
      )}
    >
      {selectedLink ? filledIcon : icon}
    </Link>
  )
}
