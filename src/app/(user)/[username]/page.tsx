import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import PostSection from "@/components/post/post-section";
import ArrowBackButton from "@/components/navigation/navigation-back-button";

import prisma from "@/utils/prisma";
import { profileTabs } from "@/data/tabs";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = createServerComponentClient({ cookies });

  const username = params.username;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = await prisma.users.findFirst({
    where: {
      user_name: username,
    },
    include: {
      _count: {
        select: { posts: true, followers: true, following: true },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="text-white relative">
      <div className="w-full flex items-center gap-4 sticky z-50 inset-0 px-2 backdrop-blur-md py-6">
        <ArrowBackButton />
        <div>
          <h5 className="text-xl font-bold">{username}</h5>
          <p className="text-gray-400 text-sm">{user._count.posts} posts</p>
        </div>
      </div>
      <section className="relative p-4 space-y-6">
        <Avatar className="w-40 h-40" src={user.avatar_url} />
        <div className="">
          <p>{user.name}</p>
          <p className="text-gray-400">{user.user_name}</p>
        </div>
        <div>
          <div className="space-x-6">
            <Link
              href="/[username]?username=username/following"
              className="text-gray-400"
            >
              <span className="text-white">{user._count.following}</span>{" "}
              Following
            </Link>
            <Link
              href="/[username]?username=username/followers"
              className="text-gray-400"
            >
              <span className="text-white">{user._count.followers}</span>{" "}
              Followers
            </Link>
          </div>
        </div>
      </section>
      <Divider />
      <PostSection
        isSticky={false}
        username={username}
        user={session?.user}
        initialState="posts"
        tabs={profileTabs}
      />
    </main>
  );
}
