import { NextResponse, NextRequest } from "next/server";
import { auth, clerkClient as getClerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user from DB
  let user = await prisma.user.findUnique({ where: { id: userId } });

  // If user doesn't exist in DB, create them from Clerk info
  if (!user) {
    const clerkClient = await getClerkClient();
    const clerkUser = await clerkClient.users.getUser(userId);

    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: clerkUser.firstName || clerkUser.username || "New User",
      },
    });
  }

  const { name, description } = await req.json();

  const project = await prisma.project.create({
    data: {
      name,
      description,
      ownerId: userId,
      members: {
        connect: { id: userId },
      },
    },
  });

  return NextResponse.json(project);
}
