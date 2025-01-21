-- AlterTable
ALTER TABLE `casa` ADD COLUMN `ativo` BOOLEAN NULL DEFAULT true,
    MODIFY `patio` BOOLEAN NULL DEFAULT false;
