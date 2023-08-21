import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

export async function clientSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function clientUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export default supabase
