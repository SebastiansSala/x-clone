import type { UserFollowDataType } from "@/types/posts";

export const createUser = async (
  id: string,
  user_name: string,
  name: string,
  avatar_url: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        user_name,
        avatar_url,
      }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
  }
};

export const followUser = async (authorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${authorId}/follow`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const unfollowUser = async (authorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${authorId}/follow`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const fetchUserFollowData = async (
  userId: string
): Promise<UserFollowDataType | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/follow`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
  }
};

export const fetchUsers = async (
  pageParam: number,
  fetchType: string,
  username: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${pageParam}&fetchType=${fetchType}&username=${username}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
  }
};

export const blockUser = async ({
  userId,
  blockedUserId,
}: {
  userId: string;
  blockedUserId: string;
}) => {
  console.log("blockedUserId", blockedUserId);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/block`,
    {
      method: "PUT",
      body: JSON.stringify({
        blockedUserId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};
