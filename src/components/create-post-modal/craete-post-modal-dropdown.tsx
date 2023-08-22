import { Button } from "@nextui-org/button"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"

type Props = {
  handleSelectedOption: (option: string) => void
  selectedOption: string
}

export default function CreatePostModalDropdown({
  handleSelectedOption,
  selectedOption,
}: Props) {
  const visibilityOptions = ["Everyone", "Followers"]

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color='primary' variant='light'>
          {selectedOption}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        {visibilityOptions.map((option) => (
          <DropdownItem
            key={option}
            onPress={() => handleSelectedOption(option)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
