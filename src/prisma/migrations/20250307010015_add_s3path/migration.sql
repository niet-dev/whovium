/*
  Warnings:

  - Added the required column `s3Path` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Made the column `imgSrc` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "s3Path" TEXT NOT NULL,
ALTER COLUMN "imgSrc" SET NOT NULL;
