/*
  Warnings:

  - The `profession` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "profession" AS ENUM ('student', 'working');

-- CreateEnum
CREATE TYPE "availableFor" AS ENUM ('hackathon', 'competative_programing', 'dsa');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "availableFor" "availableFor",
DROP COLUMN "profession",
ADD COLUMN     "profession" "profession";
