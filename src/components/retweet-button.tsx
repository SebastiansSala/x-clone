import { Button } from "@nextui-org/button";

import { RetweetIcon } from "./Icons/utility/retweet-icon";

type RetweetButtonProps = {
  onClick: () => void;
  retweetsCount: number;
  isRetweeted: boolean;
  isLoading: boolean;
};

export default function RetweetButton({
  onClick,
  retweetsCount,
  isRetweeted,
  isLoading,
}: RetweetButtonProps) {
  console.log(isRetweeted);

  return (
    <Button
      radius="full"
      isIconOnly
      isDisabled={isLoading}
      color="success"
      onPress={onClick}
      variant="light"
      className={`text-gray-500 hover:text-green-500 z-30 `}
    >
      <RetweetIcon className={`w-6 h-6 ${isRetweeted && "text-green-500"}`} />
      {retweetsCount}
    </Button>
  );
}
