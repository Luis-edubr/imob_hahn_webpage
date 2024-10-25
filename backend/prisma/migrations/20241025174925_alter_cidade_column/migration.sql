-- CreateTable
CREATE TABLE `casa` (
    `idcasa` INTEGER NOT NULL AUTO_INCREMENT,
    `isoffer` BOOLEAN NULL DEFAULT false,
    `valor` FLOAT NULL,
    `dormitorios` INTEGER NULL,
    `banheiros` INTEGER NULL,
    `suites` INTEGER NULL,
    `garagem` INTEGER NULL,
    `churrasqueira` INTEGER NULL,
    `patio` BOOLEAN NULL,
    `cidade` VARCHAR(255) NULL,
    `bairro` VARCHAR(255) NULL,

    PRIMARY KEY (`idcasa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
