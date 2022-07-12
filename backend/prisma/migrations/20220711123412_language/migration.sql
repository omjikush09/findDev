-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "cpp" BOOLEAN NOT NULL DEFAULT false,
    "java" BOOLEAN NOT NULL DEFAULT false,
    "javascript" BOOLEAN NOT NULL DEFAULT false,
    "golang" BOOLEAN NOT NULL DEFAULT false,
    "ruby" BOOLEAN NOT NULL DEFAULT false,
    "python" BOOLEAN NOT NULL DEFAULT false,
    "sql" BOOLEAN NOT NULL DEFAULT false,
    "csharp" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
