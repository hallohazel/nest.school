/*
  Warnings:

  - You are about to drop the `pengembalian` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pengembalian` DROP FOREIGN KEY `Pengembalian_id_peminjaman_fkey`;

-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'DIPINJAM';

-- DropTable
DROP TABLE `pengembalian`;
