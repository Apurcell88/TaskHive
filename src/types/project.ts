export type ProjectWithRelations = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  owner: { id: string; name?: string | null };
  members: { id: string; name?: string | null }[];
};
