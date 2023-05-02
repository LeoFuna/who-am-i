/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Avatar` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Avatar_userId_key` ON `Avatar`(`userId`);

-- AddForeignKey
ALTER TABLE `Avatar` ADD CONSTRAINT `Avatar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
