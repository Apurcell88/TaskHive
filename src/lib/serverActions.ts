import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export async function createProject({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return prisma.project.create({
    data: {
      name,
      description,
      ownerId: userId,
      members: { connect: { id: userId } }, // owner is also member
    },
  });
}
