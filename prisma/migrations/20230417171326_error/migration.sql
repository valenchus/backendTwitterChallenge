/*
  Warnings:

  - You are about to drop the column `likedBy` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `retweetedBy` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likedBy",
DROP COLUMN "retweetedBy";
