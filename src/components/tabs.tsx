import clsx from "clsx"

type TabsProps = {
  tabs: { id: string; label: string }[]
  postType: string
  handleTabChange: (tab: string) => void
}

export default function Tabs({ tabs, postType, handleTabChange }: TabsProps) {
  return (
    <nav>
      <ul
        className={`grid grid-cols-${tabs.length} sticky inset-0 z-50 backdrop-blur-sm`}
      >
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={clsx(
              "hover:bg-[#1d1f23] hover:backdrop-blur-sm text-center py-6 text-white",
              postType === tab.id && "border-b-blue-400 border-b-1"
            )}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  )
}
