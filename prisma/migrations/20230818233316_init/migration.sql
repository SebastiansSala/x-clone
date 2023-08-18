-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "publicVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retweets" (
    "id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "retweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostLikeBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentsLikedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollow_AB_unique" ON "_UserFollow"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollow_B_index" ON "_UserFollow"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostLikeBy_AB_unique" ON "_PostLikeBy"("A", "B");

-- CreateIndex
CREATE INDEX "_PostLikeBy_B_index" ON "_PostLikeBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentsLikedBy_AB_unique" ON "_CommentsLikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentsLikedBy_B_index" ON "_CommentsLikedBy"("B");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollow" ADD CONSTRAINT "_UserFollow_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollow" ADD CONSTRAINT "_UserFollow_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostLikeBy" ADD CONSTRAINT "_PostLikeBy_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostLikeBy" ADD CONSTRAINT "_PostLikeBy_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsLikedBy" ADD CONSTRAINT "_CommentsLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsLikedBy" ADD CONSTRAINT "_CommentsLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
