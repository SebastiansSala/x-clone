import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import NavbarLink from './navigation-link'

import { navigationLinks } from '@/data/links'

export default async function NavigationList() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const newNavigationLinks = navigationLinks.map((link) => {
    if (link.text === 'Profile') {
      return {
        ...link,
        href: `/${session?.user.user_metadata.user_name}`,
      }
    }
    return link
  })

  return (
    <>
      {newNavigationLinks.map(({ text, href, icon, filledIcon }) => (
        <NavbarLink
          key={href}
          text={text}
          href={href}
          icon={icon}
          filledIcon={filledIcon}
        />
      ))}
    </>
  )
}
