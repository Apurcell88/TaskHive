import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
