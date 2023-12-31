import clsx from 'clsx'

import { TabsType } from '@/types'

type TabsProps = {
  tabs: TabsType[]
  postType: string
  handleTabChange: (tab: string) => void
  isSticky: boolean
}

export default function Tabs({
  tabs,
  postType,
  handleTabChange,
  isSticky,
}: TabsProps) {
  const gridCols = tabs.length > 2 ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <nav className={clsx(isSticky && 'sticky inset-0 backdrop-blur-sm z-50')}>
      <ul className={`grid ${gridCols} `}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={clsx(
              'hover:bg-[#1d1f23] hover:backdrop-blur-sm text-center py-6 text-white',
              postType === tab.id && 'border-b-blue-400 border-b-1'
            )}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  )
}
