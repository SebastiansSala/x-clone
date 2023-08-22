import Link from "next/link"
import clsx from "clsx"

type TabsProps = {
  tabs: { id: string; label: string }[]
  postType: string
}

export default function Tabs({ tabs, postType }: TabsProps) {
  return (
    <>
      <header
        className={`grid grid-cols-${tabs.length} sticky inset-0 z-50 backdrop-blur-sm`}
      >
        {tabs.map((tab) => (
          <nav
            key={tab.id}
            className='hover:bg-[#1d1f23] hover:backdrop-blur-sm text-center py-6'
          >
            <Link
              href={"?postType=" + tab.id}
              className={clsx(
                "text-white h-full",
                postType === tab.id && "border-b-blue-400 border-b-1"
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
