import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import UsersList from "@/components/explore/explore-users-list";
import ProfileTabs from "@/components/profile-page/profile-tabs";

type ProfileFollowPageProps = {
  params: {
    username: string;
    followType: string;
  };
};

export default async function ProfileFollowPage({
  params,
}: ProfileFollowPageProps) {
  const { username, followType } = params;

  const profileTabs = [
    {
      id: "Followers",
      label: `/${username}/followers`,
    },
    {
      id: "Following",
      label: `/${username}/following`,
    },
  ];

  const supabase = createServerComponentClient({ cookies });

  return (
    <main>
      <ProfileTabs tabs={profileTabs} isSticky={true} followType={followType} />
      <UsersList fetchType={followType} username={username} />
    </main>
  );
}
