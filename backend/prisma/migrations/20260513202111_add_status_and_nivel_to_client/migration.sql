-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "nivel" TEXT NOT NULL DEFAULT 'Cliente',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Ativo';
