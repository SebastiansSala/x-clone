import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type CurrentSession = {
  id: string;
  avatar_url: string;
  name: string;
  user_name: string;
};

export default function useSession() {
  const [currentSession, setCurrentSession] = useState<CurrentSession | null>(
    null
  );

  useEffect(() => {
    const supabase = createClientComponentClient();
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!session) {
          return;
        }
        const { user } = session;

        const { id, user_metadata } = user;

        const { avatar_url, name, user_name } = user_metadata;

        setCurrentSession({ id, avatar_url, name, user_name });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { currentSession };
}
