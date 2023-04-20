/*
  Warnings:

  - You are about to drop the column `typeReaction` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the `Retweet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reaction` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_postId_fkey";

-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_userId_fkey";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "typeReaction",
ADD COLUMN     "reaction" VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE "Retweet";
