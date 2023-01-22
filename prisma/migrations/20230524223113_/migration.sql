/*
  Warnings:

  - Made the column `authorId` on table `tb_pbot` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_pbot" ALTER COLUMN "authorId" SET NOT NULL;
