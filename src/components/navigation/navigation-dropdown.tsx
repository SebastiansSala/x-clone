'use client'

import { Button } from '@nextui-org/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import clsx from 'clsx'

import { OptionsIcon } from '../Icons/utility/option-icon'
import SignOutClientButton from '../auth/auth-signout-client-button'

export default function NavigationDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          radius="none"
          className={clsx(
            'text-white bg-transparent p-2 py-3 min-w-fit xl:px-2 md:py-1 w-full text-xl flex hover:bg-slate-500 transition xl:py-2 justify-center xl:rounded-full h-full md:h-auto xl:gap-2 xl:items-center xl:justify-between xl:text-center xl:w-fit'
          )}
        >
          <OptionsIcon className="w-8 h-8 xl:mr-4" />
          <span className="hidden xl:block">More</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="signout">
          <SignOutClientButton />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
