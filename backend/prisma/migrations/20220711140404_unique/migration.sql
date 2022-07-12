/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Language_userId_key" ON "Language"("userId");
