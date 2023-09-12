"use client";

import { useQueryClient, useMutation } from "react-query";
import type { User } from "@supabase/supabase-js";

import {
  likePost,
  unlikePost,
  createRetweet,
  deleteRetweet,
} from "@/services/posts-services";

import { PostType } from "@/types/posts";
import toast from "react-hot-toast";

type postObjectType = {
  pages: PageType[];
  pageParams: pageParams[];
};

type PageType = {
  nextId?: string;
  posts: PostType[];
};

type pageParams = string | undefined;

export default function usePostActions(postType: string, user?: User) {
  const queryClient = useQueryClient();

  const removeLike = useMutation(unlikePost, {
    onMutate: async (postId: string) => {
      if (!user) {
        toast.error("You must be logged in to like a post");
        return;
      }
      await queryClient.cancelQueries(["posts", postType]);

      const data = queryClient.getQueryData([
        "posts",
        postType,
      ]) as postObjectType;

      queryClient.setQueryData(["posts", postType], (oldData: any) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page: PageType) => ({
          ...page,
          posts: page?.posts?.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: post.likes.filter((like) => like.id !== user.id),
              };
            }
            return post;
          }),
        }));

        return { ...oldData, pages: newPages };
      });

      return { prevData: data };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  const addLike = useMutation(likePost, {
    onMutate: async (postId: string) => {
      if (!user) return;
      await queryClient.cancelQueries(["posts", postType]);

      const data = queryClient.getQueryData([
        "posts",
        postType,
      ]) as postObjectType;

      queryClient.setQueryData(["posts", postType], (oldData: any) => {
        if (!oldData) return oldData;

        const { id, user_metadata } = user;
        const { user_name, name, avatar_url } = user_metadata;

        const newPages = oldData?.pages?.flatMap((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: [
                  ...post.likes,
                  {
                    id,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              };
            }
            return post;
          }),
        }));

        return { ...oldData, pages: newPages };
      });

      return { prevData: data };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  const addRetweet = useMutation(createRetweet, {
    onMutate: async (postId: string) => {
      if (!user) return;
      await queryClient.cancelQueries(["posts", postType]);

      const data = queryClient.getQueryData([
        "posts",
        postType,
      ]) as postObjectType;

      queryClient.setQueryData(["posts", postType], (oldData: any) => {
        if (!oldData) return oldData;

        const { id, user_metadata } = user;
        const { user_name, name, avatar_url } = user_metadata;

        const newPages = oldData?.pages?.flatMap((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                retweets: [
                  ...post.retweets,
                  {
                    id,
                    user_name,
                    name,
                    avatar_url,
                  },
                ],
              };
            }
            return post;
          }),
        }));

        return { ...oldData, pages: newPages };
      });

      return { prevData: data };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  const removeRetweet = useMutation(deleteRetweet, {
    onMutate: async (postId: string) => {
      if (!user) return;
      await queryClient.cancelQueries(["posts", postType]);

      const data = queryClient.getQueryData([
        "posts",
        postType,
      ]) as postObjectType;

      queryClient.setQueryData(["posts", postType], (oldData: any) => {
        if (!oldData) return oldData;

        const { id } = user;

        const newPages = oldData?.pages?.flatMap((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                retweets: [
                  ...post.retweets.filter((retweet) => retweet.authorId !== id),
                ],
              };
            }
            return post;
          }),
        }));

        return { ...oldData, pages: newPages };
      });

      return { prevData: data };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  return {
    addLike,
    removeLike,
    addRetweet,
    removeRetweet,
  };
}
