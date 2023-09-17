import Logo from '@/components/Icons/social/logo-icon'
import PostModal from '../create-post-modal/create-post-modal'
import NavigationDropdown from './navigation-dropdown'
import NavigationLinkIcon from './navigation-link-icon'
import NavigationList from './navigation-list'

const NavigationAside = () => {
  return (
    <aside className="z-50 xl:col-span-2 sm:col-span-1 fixed w-full sm:static bottom-0">
      <nav className="sticky bottom-0 md:py-4 flex sm:block sm:space-y-4 lg:space-y-6 z-50 sm:py-0 w-full inset-0 sm:min-h-screen bg-black border-t-1 sm:border-t-0 border-[#2f3336]">
        <NavigationLinkIcon
          href="/home"
          icon={<Logo className="h-8 fill-white font-black" />}
        />
        <NavigationList />
        <NavigationDropdown />
        <PostModal />
      </nav>
    </aside>
  )
}

export default NavigationAside
