/*
  Warnings:

  - You are about to drop the column `AuthorId` on the `posts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Posts_AuthorId_fkey` ON `posts`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `AuthorId`,
    ADD COLUMN `authorId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Users_email_idx` ON `Users`(`email`);

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
