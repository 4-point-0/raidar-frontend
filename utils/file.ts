import { FileDto } from "@/services/api/artist/artistSchemas";

export function getFileUrl(file?: FileDto) {
  if (!file) return;

  return `${file.url}?updatedAt=${file.updated_at}`;
}
