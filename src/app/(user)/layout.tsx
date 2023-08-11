import { Input } from "@nextui-org/input"
import AsideNav from "@/components/AsideNav"
import MailFilledIcon from "@/components/Icons/MailFilledIcon"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-black'>
      <div className='grid grid-cols-6 container mx-auto relative h-auto'>
        <aside className='px-10 col-span-1'>
          <AsideNav />
        </aside>
        <main className='col-span-3 border min-h-screen'>{children}</main>
        <aside className='col-span-2 px-10 relative '>
          <div className='sticky inset-0'>
            <Input
              type='email'
              label='Email'
              placeholder='you@example.com'
              labelPlacement='outside'
              startContent={
                <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
              }
            />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default UserLayout
