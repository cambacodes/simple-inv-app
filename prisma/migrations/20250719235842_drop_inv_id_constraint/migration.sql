/*
  Warnings:

  - A unique constraint covering the columns `[saleId]` on the table `SaleItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `SaleItem` DROP FOREIGN KEY `SaleItem_saleId_fkey`;

-- DropIndex
DROP INDEX `SaleItem_saleId_inventoryItemId_key` ON `SaleItem`;