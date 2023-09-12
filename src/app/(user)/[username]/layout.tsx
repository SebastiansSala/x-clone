import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";

import PostSection from "@/components/post/post-section";
import ArrowBackButton from "@/components/navigation/navigation-back-button";

import prisma from "@/utils/prisma";
import { profileTabs } from "@/data/tabs";

type ProfilePageProps = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export default async function ProfilePageLayout({
  params,
  children,
}: ProfilePageProps) {
  const supabase = createServerComponentClient({ cookies });

  const username = params.username;

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
      <header className="w-full flex items-center gap-4 sticky z-50 inset-0 px-2 backdrop-blur-md py-6">
        <ArrowBackButton />
        <div>
          <h5 className="text-xl font-bold">{username}</h5>
          <p className="text-gray-400 text-sm">{user._count.posts} posts</p>
        </div>
      </header>
      {children}
    </main>
  );
}
