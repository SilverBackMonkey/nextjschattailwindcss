/*
  Warnings:

  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `afcRewards` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "type" INTEGER;

-- AlterTable
ALTER TABLE "ScratchCardGame" ADD COLUMN     "chipset" TEXT[],
ADD COLUMN     "freePlay" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 1,
ALTER COLUMN "afcRewards" SET NOT NULL,
ALTER COLUMN "afcRewards" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER,
    "parentId" INTEGER,
    "rating" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScratchCardAward" (
    "id" SERIAL NOT NULL,
    "awarded" BOOLEAN NOT NULL,
    "usdAmount" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScratchCardAward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScratchCardAward" ADD CONSTRAINT "ScratchCardAward_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "ScratchCardGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScratchCardAward" ADD CONSTRAINT "ScratchCardAward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
