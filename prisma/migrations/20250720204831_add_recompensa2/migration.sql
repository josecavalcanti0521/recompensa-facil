/*
  Warnings:

  - Added the required column `descricao` to the `recompensas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recompensas` ADD COLUMN `descricao` VARCHAR(191) NOT NULL;
