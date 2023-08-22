import NavbarLink from "./navigation-link"

import { navigationLinks } from "@/data/links"

const NavigationList = () => {
  return (
    <>
      {navigationLinks.map(({ text, href, icon, filledIcon }) => (
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

export default NavigationList
