/*
  Warnings:

  - Added the required column `discount` to the `FixedDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FixedDiscount" ADD COLUMN     "discount" INTEGER NOT NULL;
