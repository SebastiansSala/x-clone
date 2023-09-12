"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";

import LikeButton from "./post-like-button";
import CommentButton from "./post-comment-button";
import RetweetButton from "./post-retweet-button";
import OptionsDropdown from "./post-options-dropdown";

import type { PostType } from "@/types/posts";
import { Button } from "@nextui-org/button";
import CommentsModal from "../comments-modal/comments-modal";

type PostProps = {
  post: PostType;
  user?: User;
  likeMutation: any;
  removeLikeMutation: any;
  isFollowing: boolean;
  onFollowChange: (authorId: string) => void;
};

export default function PostCard({
  post,
  user,
  likeMutation,
  isFollowing,
  onFollowChange,
  removeLikeMutation,
}: PostProps) {
  const isLiked = post.likes.some((like) => like.id === user?.id);

  const showPublicButtons = user?.id !== post.author.id && user ? true : false;

  const likesCount = post.likes.length;

  const handleLike = async () => {
    try {
      if (isLiked) {
        await removeLikeMutation.mutateAsync(post.id);
        return;
      }
      await likeMutation.mutateAsync(post.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetweet = () => {};

  return (
    <div className="grid grid-cols-12 p-4">
      <Avatar className="col-span-1" src={post.author.avatar_url} />
      <div className="col-span-11">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <h4>{post.author.name}</h4>
            <p className="text-gray-500">{post.author.user_name}</p>
          </div>
          <OptionsDropdown
            author={post.author}
            isFollowing={isFollowing}
            onClick={onFollowChange}
            showPublicButtons={showPublicButtons}
          />
        </div>
        <div className="w-full">
          <p className="truncate max-w-full">{post.text}</p>
        </div>
        <div>
          {post.images?.map((image, index) => (
            <Image
              key={index}
              isZoomed
              width={240}
              alt={index.toString()}
              src={image.url}
            />
          ))}
        </div>
        <div className="flex justify-evenly py-2">
          <CommentsModal
            commentsCount={post.comments.length}
            author_avatarUrl={post.author.avatar_url}
            author_name={post.author.name}
            author_username={post.author.user_name}
            post_description={post.text}
            created_at={post.createdAt}
          />
          <RetweetButton
            onClick={handleRetweet}
            retweetsCount={post.retweets.length}
          />
          <LikeButton
            onClick={handleLike}
            likesCount={likesCount}
            isLiked={isLiked}
          />
        </div>
      </div>
    </div>
  );
}
