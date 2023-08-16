import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabaseServer = createServerComponentClient({ cookies });

export async function checkSessionServer() {
  const supabase = supabaseServer;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export default supabaseServer;
