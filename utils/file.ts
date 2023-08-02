import { FileDto } from "@/services/api/raidar/raidarSchemas";

export function getFileUrl(file?: FileDto) {
  if (!file) return;

  return `${file.url}?updatedAt=${file.updated_at}`;
}
