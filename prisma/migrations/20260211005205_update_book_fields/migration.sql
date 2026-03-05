/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `publisher` VARCHAR(191) NOT NULL,
    ADD COLUMN `stock` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Book_code_key` ON `Book`(`code`);
