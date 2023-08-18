-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "screen_name" TEXT NOT NULL,
    "description" TEXT,
    "followersCount" INTEGER NOT NULL,
    "listedCount" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "retweets_count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "publicVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retweets" (
    "id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Retweets_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retweets" ADD CONSTRAINT "Retweets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retweets" ADD CONSTRAINT "Retweets_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollow" ADD CONSTRAINT "_UserFollow_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollow" ADD CONSTRAINT "_UserFollow_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostLikeBy" ADD CONSTRAINT "_PostLikeBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostLikeBy" ADD CONSTRAINT "_PostLikeBy_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsLikedBy" ADD CONSTRAINT "_CommentsLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsLikedBy" ADD CONSTRAINT "_CommentsLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
