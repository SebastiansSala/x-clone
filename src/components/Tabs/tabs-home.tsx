"use client"

import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Tabs() {
  const params = useParams()

  let tabs = [
    {
      id: "fyp",
      label: "Posts",
    },
    {
      id: "following",
      label: "Following",
    },
  ]

  console.log(params)

  return (
    <>
      <header className='grid grid-cols-2 sticky inset-0 z-50 backdrop-blur-sm'>
        {tabs.map((tab) => (
          <nav
            key={tab.id}
            className='hover:bg-[#1d1f23] hover:backdrop-blur-sm text-center py-6'
          >
            <Link
              href={tab.id}
              className={clsx(
                "text-white h-full",
                params.postsType === tab.id && "border-b-blue-400 border-b-1"
              )}
            >
              {tab.label}
            </Link>
          </nav>
        ))}
      </header>
    </>
  )
}
