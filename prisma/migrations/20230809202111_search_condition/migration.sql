-- CreateTable
CREATE TABLE "casino_filter_condition" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,

    CONSTRAINT "casino_filter_condition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "casino_filter_condition" ADD CONSTRAINT "casino_filter_condition_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
