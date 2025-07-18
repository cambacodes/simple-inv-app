-- CreateTable
CREATE TABLE `InventoryItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `stock` INTEGER NOT NULL,

    UNIQUE INDEX `InventoryItem_name_key`(`name`),
    INDEX `InventoryItem_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `firstLastName` VARCHAR(50) NOT NULL,
    `secondLastName` VARCHAR(50) NOT NULL,
    `ci` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `nit` VARCHAR(50) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `countryOfBirth` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Client_ci_key`(`ci`),
    UNIQUE INDEX `Client_email_key`(`email`),
    UNIQUE INDEX `Client_nit_key`(`nit`),
    INDEX `Client_firstName_idx`(`firstName`),
    INDEX `Client_firstLastName_idx`(`firstLastName`),
    INDEX `Client_secondLastName_idx`(`secondLastName`),
    INDEX `Client_ci_idx`(`ci`),
    INDEX `Client_email_idx`(`email`),
    INDEX `Client_nit_idx`(`nit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` INTEGER NOT NULL,
    `saleNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Sale_saleNumber_key`(`saleNumber`),
    INDEX `Sale_saleNumber_idx`(`saleNumber`),
    INDEX `Sale_saleDate_idx`(`saleDate`),
    INDEX `Sale_clientId_idx`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saleId` VARCHAR(191) NOT NULL,
    `inventoryItemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `SaleItem_inventoryItemId_idx`(`inventoryItemId`),
    UNIQUE INDEX `SaleItem_saleId_inventoryItemId_key`(`saleId`, `inventoryItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_inventoryItemId_fkey` FOREIGN KEY (`inventoryItemId`) REFERENCES `InventoryItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
