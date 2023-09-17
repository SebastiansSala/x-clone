'use client'

import Link from 'next/link'
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
      href={href}
      className={clsx(
        'text-white text-xl flex hover:bg-slate-500 py-3 md:py-1 transition xl:py-2 justify-center px-2 xl:rounded-full xl:gap-2 xl:items-center xl:justify-center xl:text-center w-full xl:w-fit',
        selectedLink && 'font-black'
      )}
    >
      <span className="xl:mr-3">{selectedLink ? filledIcon : icon}</span>
      <span className="hidden xl:block">{text}</span>
    </Link>
  )
}
