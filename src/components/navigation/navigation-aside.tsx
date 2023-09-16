import Logo from '@/components/Icons/social/logo-icon'
import SignOutClientButton from '../auth/auth-signout-client-button'
import PostModal from '../create-post-modal/create-post-modal'
import NavigationLinkIcon from './navigation-link-icon'
import NavigationList from './navigation-list'

const NavigationAside = () => {
  return (
    <nav className="sticky space-y-6 w-full inset-0 min-h-screen">
      <NavigationLinkIcon
        href="/home"
        icon={<Logo className="h-8 fill-white font-black" />}
      />

      <NavigationList />
      <PostModal />
      <div className="absolute bottom-0 color-white">
        <SignOutClientButton />
      </div>
    </nav>
  )
}

export default NavigationAside
