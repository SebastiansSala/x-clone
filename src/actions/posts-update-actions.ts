import prisma from "@/utils/prisma";

export const updatePostImages = async (postId: string, url: string) => {
  try {
    return await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        images: {
          create: {
            url,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const updatePostLikes = async (
  postId: string,
  userId: string,
) => {
  try {
    return await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        likes: true,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
