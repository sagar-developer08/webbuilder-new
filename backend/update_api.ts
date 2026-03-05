import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const apiId = "cmmdfptha003ebqyvw1benlaa";
  const updated = await prisma.savedApi.update({
    where: { id: apiId },
    data: {
      columns: ["email", "password", "createdAt"],
    },
  });
  console.log("API successfully updated to include 'email', 'password', and 'createdAt' columns.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
