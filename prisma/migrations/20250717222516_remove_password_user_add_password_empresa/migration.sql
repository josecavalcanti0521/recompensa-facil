/*
  Warnings:

  - You are about to drop the column `password` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `password` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `password`;
