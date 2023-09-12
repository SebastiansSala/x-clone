"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";

import LikeButton from "./post-like-button";
import RetweetButton from "./post-retweet-button";
import OptionsDropdown from "./post-options-dropdown";
import CommentsModal from "../comments-modal/comments-modal";

import type { PostType } from "@/types/posts";

import { Link } from "@nextui-org/link";

type PostProps = {
  post: PostType;
  user?: User;
  likeMutation: any;
  removeLikeMutation: any;
  isFollowing: boolean;
  onFollowChange: (authorId: string) => void;
  addRetweetMutation: any;
  deleteRetweetMutation: any;
};

export default function PostCard({
  post,
  user,
  likeMutation,
  isFollowing,
  onFollowChange,
  removeLikeMutation,
  addRetweetMutation,
  deleteRetweetMutation,
}: PostProps) {
  const isLiked = post.likes.some((like) => like.id === user?.id);
  const isRetweeted = post.retweets.some(
    (retweet) => retweet.authorId === user?.id
  );

  const [toggleRetweet, setToggleRetweet] = useState(isRetweeted);

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

  const handleRetweet = async () => {
    try {
      console.log(toggleRetweet);
      if (toggleRetweet) {
        await deleteRetweetMutation.mutateAsync(post.id);
        setToggleRetweet(false);
        return;
      }
      await addRetweetMutation.mutateAsync(post.id);
      setToggleRetweet(true);
    } catch (e) {
      console.error(e);
      setToggleRetweet(!toggleRetweet);
    }
  };

  return (
    <div className="grid grid-cols-12 p-4 relative">
      <Link href={`/${post.author.user_name}`}>
        <Avatar className="col-span-1 z-30" src={post.author.avatar_url} />
      </Link>
      <div className="col-span-11">
        <div className="flex justify-between items-center">
          <Link href={`/${post.author.user_name}`} className="flex gap-4 z-30">
            <h4 className="text-white">{post.author.name}</h4>
            <h5 className="text-gray-500">{post.author.user_name}</h5>
          </Link>
          <OptionsDropdown
            author={post.author}
            isFollowing={isFollowing}
            onClick={onFollowChange}
            showPublicButtons={showPublicButtons}
          />
        </div>
        <div className="w-full ">
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
            isRetweeted={toggleRetweet}
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
