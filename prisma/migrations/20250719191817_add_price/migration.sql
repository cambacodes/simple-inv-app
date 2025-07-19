/*
  Warnings:

  - Added the required column `basePriceCents` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InventoryItem` ADD COLUMN `basePriceCents` INTEGER NOT NULL;
