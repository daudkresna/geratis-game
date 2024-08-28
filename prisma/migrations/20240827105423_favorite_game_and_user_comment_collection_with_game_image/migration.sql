/*
  Warnings:

  - Added the required column `gameName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameName` to the `FavoriteGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameThumbnail` to the `FavoriteGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "gameName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FavoriteGame" ADD COLUMN     "gameName" TEXT NOT NULL,
ADD COLUMN     "gameThumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPassword" TEXT NOT NULL;
