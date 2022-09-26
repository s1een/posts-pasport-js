/*
  Warnings:

  - Made the column `authorId` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Posts_authorId_fkey` ON `posts`;

-- AlterTable
ALTER TABLE `posts` MODIFY `authorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
