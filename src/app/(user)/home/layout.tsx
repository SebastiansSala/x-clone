import Tabs from "@/components/Tabs/tabs-home"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='text-white relative'>
      <Tabs />

      <main>{children}</main>
    </div>
  )
}
