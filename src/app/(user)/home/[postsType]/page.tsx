import { redirect } from "next/navigation"
import { getServerSession } from "@/utils/supabase-server"
import Tabs from "@/components/Tabs/tabs-home"
import PostSection from "@/components/PostSection"

export default async function Home({
  params,
}: {
  params: { postsType: string }
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  return <PostSection userId={userId} postType={params.postsType} />
}
