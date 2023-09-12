"use client";

import type { User } from "@supabase/supabase-js";
import { Spinner } from "@nextui-org/spinner";
import { Divider } from "@nextui-org/divider";

import PostCard from "@/components/post/post-card";

import useInfinitePosts from "@/hooks/use-infinite-posts";
import useAuthData from "@/hooks/use-auth-data";
import usePostActions from "@/hooks/use-post-actions";
import useFollow from "@/hooks/use-auth";

type Props = {
  postType: string;
  username?: string;
  user?: User;
};

export default function PostList({ postType, username, user }: Props) {
  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    useInfinitePosts(postType, username);

  const { following } = useAuthData();

  const { followingMap, toggleFollow } = useFollow(following);

  const { addLike, removeLike } = usePostActions(postType, user);

  if (isLoading)
    return (
      <div className="h-full w-full grid place-content-center min-h-screen">
        <Spinner color="default" size="lg" className="text-center mx-auto" />
      </div>
    );
  if (isError) return <div>Error! {JSON.stringify(error)}</div>;

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          <PostCard
            post={post}
            user={user}
            likeMutation={addLike}
            removeLikeMutation={removeLike}
            isFollowing={followingMap.includes(post.author.id)}
            onFollowChange={toggleFollow}
          />
          <Divider />
        </li>
      ))}

      {isFetchingNextPage ? (
        <div className="py-14 grid place-content-center">
          <Spinner color="default" size="lg" />
        </div>
      ) : null}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </ul>
  );
}
