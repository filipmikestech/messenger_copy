/*
  Warnings:

  - You are about to drop the `Rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoomsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoomsToUser" DROP CONSTRAINT "_RoomsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomsToUser" DROP CONSTRAINT "_RoomsToUser_B_fkey";

-- DropTable
DROP TABLE "Rooms";

-- DropTable
DROP TABLE "_RoomsToUser";
