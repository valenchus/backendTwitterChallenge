-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "parentPost" TEXT;

-- CreateTable
CREATE TABLE "Reaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "typeReaction" VARCHAR(30) NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);
