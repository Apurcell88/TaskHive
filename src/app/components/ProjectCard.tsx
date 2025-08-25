import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string | null;
    owner: { id: string; name?: string | null };
    members: { id: string; name?: string | null }[];
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
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
  );
};

export default ProjectCard;
