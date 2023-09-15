import type { ImageListType } from "react-images-uploading";

import type { PostType } from "@/types/posts";

export const createPost = async (
  text: string,
  selectedOption: string,
  images?: ImageListType[]
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        images,
        selectedOption,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
  }
};

export const fetchPosts = async (
  postType: string,
  pageParam: number,
  username?: string
): Promise<{ posts: PostType[]; nextId: string }> => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/posts?postType=${postType}&cursor=${pageParam}&username=${
      username ?? ""
    }`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data;
};

export const likePost = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/likes`,
      {
        method: "PUT",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
  }
};

export const unlikePost = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/likes`,
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
  }
};

export const createRetweet = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/retweets`,
      {
        method: "POST",
      }
    );

    console.log("res", res);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (e) {
    console.error(e);
  }
};

export const deleteRetweet = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/retweets`,
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
  }
};
