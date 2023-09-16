'use client'

import { Link } from '@nextui-org/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

type NavigationLinkProps = {
  text: string
  href: string
  icon: React.ReactNode
  filledIcon?: React.ReactNode
}
export default function NavigationLink({
  text,
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
        'text-white text-xl hover:bg-slate-500 transition py-4 sm:rounded-full flex gap-2 items-center px-2 justify-center text-center w-full xl:w-fit',
        selectedLink && 'font-black'
      )}
    >
      <span className="xl:mr-3">{selectedLink ? filledIcon : icon}</span>
      <span className="hidden xl:block">{text}</span>
    </Link>
  )
}
