"use client";

import type { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import {
  createRetweet,
  deleteRetweet,
  likePost,
  unlikePost,
} from "@/services/posts-services";

import { PostType } from "@/types/posts";

type PostObjectType = {
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

  const deleteLikeMutation = useMutation(unlikePost, {
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries(["posts", postType]);
      const oldData = queryClient.getQueryData<PostObjectType>([
        "posts",
        postType,
      ]);

      if (!user) return toast.error("You must be logged in to like a post");

      queryClient.setQueryData(["posts", postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: post.likes.filter((like) => like.id !== user.id),
              };
            }
            return post;
          }),
        }));

        return {
          ...oldData,
          pages: newData,
        };
      });
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  const addLikeMutation = useMutation(likePost, {
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries(["posts", postType]);
      const oldData = queryClient.getQueryData<PostObjectType>([
        "posts",
        postType,
      ]);

      if (!user) return toast.error("You must be logged in to like a post");

      const { id, user_name, name, avatar_url } = user.user_metadata;

      queryClient.setQueryData(["posts", postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
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

        return {
          ...oldData,
          pages: newData,
        };
      });
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  const addRetweet = useMutation(createRetweet, {
    onMutate: async (postId: string) => {
      if (!user) return toast.error("You must be logged in to retweet a post");

      await queryClient.cancelQueries(["posts", postType]);

      const oldData = queryClient.getQueryData<PostObjectType>([
        "posts",
        postType,
      ]);

      const { id, user_name, name, avatar_url } = user.user_metadata;

      queryClient.setQueryData(["posts", postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
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
        return {
          ...oldData,
          pages: newData,
        };
      });
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  const deleteRetweetMutation = useMutation(deleteRetweet, {
    onMutate: async (postId: string) => {
      if (!user) return toast.error("You must be logged in to retweet a post");

      await queryClient.cancelQueries(["posts", postType]);

      const oldData = queryClient.getQueryData<PostObjectType>([
        "posts",
        postType,
      ]);

      queryClient.setQueryData(["posts", postType], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                retweets: [
                  ...post.retweets.filter(
                    (retweet) => retweet.authorId !== user.id
                  ),
                ],
              };
            }
            return post;
          }),
        }));
        return {
          ...oldData,
          pages: newData,
        };
      });
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", postType], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", postType]);
    },
  });

  return {
    addLikeMutation,
    deleteLikeMutation,
    addRetweet,
    deleteRetweetMutation,
  };
}
