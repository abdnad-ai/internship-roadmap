const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();

  await prisma.task.createMany({
    data: [
      {
        title: "Set up the database",
        description: "Create the task_manager database and connect Prisma",
        completed: true,
      },
      {
        title: "Define the Task model",
        description: "Add the Task model and run the first migration",
        completed: true,
      },
      {
        title: "Build the CRUD endpoints",
        description: "Create task endpoints in NestJS",
        completed: false,
      },
      {
        title: "Build the task UI",
        description: "Connect the Next.js frontend to the API",
        completed: false,
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 