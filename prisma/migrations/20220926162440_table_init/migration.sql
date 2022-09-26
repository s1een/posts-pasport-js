/*
  Warnings:

  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Posts_authorId_fkey` ON `posts`;

-- DropTable
DROP TABLE `tokens`;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
