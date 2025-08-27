import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;

  // Ensure the user is the owner before deleting
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project)
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  if (project.ownerId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
