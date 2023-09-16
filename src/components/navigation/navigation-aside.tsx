import Logo from '@/components/Icons/social/logo-icon'
import SignOutClientButton from '../auth/auth-signout-client-button'
import PostModal from '../create-post-modal/create-post-modal'
import NavigationLinkIcon from './navigation-link-icon'
import NavigationList from './navigation-list'

const NavigationAside = () => {
  return (
    <nav className="sticky bottom-0 flex sm:block sm:space-y-6 z-50 sm:py-0 w-full inset-0 sm:min-h-screen bg-black border-t-1 sm:border-t-0 border-[#2f3336]">
      <NavigationLinkIcon
        href="/home"
        icon={<Logo className="h-8 fill-white font-black" />}
      />

      <NavigationList />
      <PostModal />
      <div className="absolute bottom-0 color-white hidden md:block">
        <SignOutClientButton />
      </div>
    </nav>
  )
}

export default NavigationAside
