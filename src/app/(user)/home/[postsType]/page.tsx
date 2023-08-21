import { redirect } from "next/navigation"
import { serverSession } from "@/utils/supabase-server"
import PostSection from "@/components/post-section"

export default async function Home({
  params,
}: {
  params: { postsType: string }
}) {
  const session = await serverSession()

  if (!session) {
    redirect("/")
  }

  console.log(params)

  return <PostSection postType={params.postsType} />
}
