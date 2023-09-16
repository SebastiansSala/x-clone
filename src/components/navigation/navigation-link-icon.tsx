'use client'

import { Link } from '@nextui-org/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

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

  const selectedLink = pathname.split('/').includes(href)

  return (
    <Link
      isBlock
      href={href}
      color="foreground"
      disableAnimation={false}
      className={clsx(
        'text-white text-xl hover:bg-slate-500 transition rounded-full gap-2 items-center xl:w-fit w-full p-2 justify-center text-center hidden sm:flex',
        selectedLink && 'font-black'
      )}
    >
      {selectedLink ? filledIcon : icon}
    </Link>
  )
}
