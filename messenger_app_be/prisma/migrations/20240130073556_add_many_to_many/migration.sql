/*
  Warnings:

  - You are about to drop the column `roomsId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roomsId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roomsId";

-- CreateTable
CREATE TABLE "_RoomsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomsToUser_AB_unique" ON "_RoomsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomsToUser_B_index" ON "_RoomsToUser"("B");

-- AddForeignKey
ALTER TABLE "_RoomsToUser" ADD CONSTRAINT "_RoomsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomsToUser" ADD CONSTRAINT "_RoomsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
