-- AlterTable
ALTER TABLE `user` ADD COLUMN `memberId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
