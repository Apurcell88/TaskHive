"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { ProjectWithRelations } from "@/types/project";

interface ProjectCardProps {
  project: ProjectWithRelations;
  onDelete?: (id: string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");

      toast.success("Project deleted!");
      onDelete?.(project.id); // notify parent to refresh or remove locally
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="block p-4 border rounded-lg hover:shadow-lg transition">
      <Link
        href={`/projects/${project.id}`}
        className="block p-4 border rounded-lg hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold">{project.name}</h2>
        {project.description && (
          <p className="text-gray-600">{project.description}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Owner: {project.owner.name || "Unknown"} | Members:{" "}
          {project.members.length}
        </p>
      </Link>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="mt-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-100"
      >
        {loading ? "Deleting" : "Delete"}
      </button>
    </div>
  );
};

export default ProjectCard;
