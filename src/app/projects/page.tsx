import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProjectCard from "../components/ProjectCard";
import { prisma } from "@/lib/prisma";
import NewProjectForm from "../components/NewProjectForm";

export const revalidate = 0; // optional, prevents caching for fresh data

const ProjectsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    // Redirect to login if not signed in
    redirect("/sign-in");
  }

  // Fetch projects where the user is owner or member
  const projects = await prisma.project.findMany({
    where: {
      OR: [{ ownerId: userId }, { members: { some: { id: userId } } }],
    },
    include: {
      owner: { select: { id: true, name: true } },
      members: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

      <NewProjectForm />

      {projects.length === 0 && (
        <p>No projects yet. Create one to get started!</p>
      )}

      <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;
