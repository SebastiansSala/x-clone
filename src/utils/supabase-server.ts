import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient({ cookies })
export async function serverSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function serverUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export default supabase
