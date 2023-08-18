import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient({ cookies })
export async function getServerSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export default supabase
