import { TabsType } from "@/types";
import clsx from "clsx";
import Link from "next/link";

type TabsProps = {
  tabs: TabsType[];
  followType: string;
  isSticky: boolean;
};

export default function ProfileTabs({ tabs, followType, isSticky }: TabsProps) {
  const gridCols = tabs.length > 2 ? "grid-cols-3" : "grid-cols-2";

  return (
    <nav className={clsx(isSticky && "sticky inset-0 backdrop-blur-sm z-50")}>
      <ul className={`grid ${gridCols} `}>
        {tabs.map((tab) => {
          const uppercaseType =
            followType.charAt(0).toUpperCase() + followType.slice(1);

          return (
            <Link
              href={tab.label}
              key={tab.id}
              className={clsx(
                "hover:bg-[#1d1f23] hover:backdrop-blur-sm text-center py-6 text-white",
                uppercaseType === tab.id && "border-b-blue-400 border-b-1"
              )}
            >
              {tab.id}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
