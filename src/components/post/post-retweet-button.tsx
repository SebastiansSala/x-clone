import { Button } from "@nextui-org/button";

import { RetweetIcon } from "../Icons/utility/retweet-icon";

type RetweetButtonProps = {
  onClick: () => void;
  retweetsCount: number;
  isRetweeted: boolean;
};

export default function RetweetButton({
  onClick,
  retweetsCount,
  isRetweeted,
}: RetweetButtonProps) {
  return (
    <Button
      radius="full"
      isIconOnly
      color="success"
      onPress={onClick}
      variant="light"
      className={`text-gray-500 hover:text-green-500 z-30 `}
    >
      <RetweetIcon className={`w-6 h-6 ${isRetweeted && "fill-green-500"}`} />
      {retweetsCount}
    </Button>
  );
}
