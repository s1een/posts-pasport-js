-- DropIndex
DROP INDEX `Posts_authorId_fkey` ON `posts`;

-- AlterTable
ALTER TABLE `posts` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
