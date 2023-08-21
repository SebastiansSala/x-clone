import Link from "next/link"
import clsx from "clsx"

type TabsUsernameProps = {
  tabs: { id: string; label: string }[]
  postType: string
  username: string
}

export default function TabsUsername({
  tabs,
  postType,
  username,
}: TabsUsernameProps) {
  return (
    <>
      <header className='grid grid-cols-3 sticky inset-0 z-50 backdrop-blur-sm'>
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
