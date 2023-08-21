import TabsHome from "@/components/Tabs/tabs-home"
import { postTabs } from "@/data/tabs"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='text-white relative'>
      <TabsHome tabs={postTabs} />
      <main>{children}</main>
    </div>
  )
}
