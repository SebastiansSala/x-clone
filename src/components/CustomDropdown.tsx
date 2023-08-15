import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"

type CustomDropdownProps = {
  trigger: React.ReactNode
  options: string[]
  setSelectedOption: (option: string) => void
}

const CustomDropdown = ({
  trigger,
  options,
  setSelectedOption,
}: CustomDropdownProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        {options.map((option) => (
          <DropdownItem key={option} onPress={() => setSelectedOption(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CustomDropdown
