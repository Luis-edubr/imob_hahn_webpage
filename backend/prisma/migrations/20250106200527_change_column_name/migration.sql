/*
  Warnings:

  - You are about to drop the `Casa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Casa`;

-- CreateTable
CREATE TABLE `casa` (
    `idcasa` INTEGER NOT NULL AUTO_INCREMENT,
    `isoffer` BOOLEAN NULL DEFAULT false,
    `valor` DOUBLE NULL,
    `dormitorios` INTEGER NULL,
    `banheiros` INTEGER NULL,
    `suites` INTEGER NULL,
    `garagem` INTEGER NULL,
    `churrasqueira` INTEGER NULL,
    `patio` BOOLEAN NULL,
    `cidade` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `imagens` VARCHAR(191) NULL,

    PRIMARY KEY (`idcasa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
