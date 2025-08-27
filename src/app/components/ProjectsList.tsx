"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { ProjectWithRelations } from "@/types/project";

type ProjectsListProps = {
  projects: ProjectWithRelations[];
};

export default function ProjectsList({
  projects: initialProjects,
}: ProjectsListProps) {
  const [projects, setProjects] = useState(initialProjects);

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
