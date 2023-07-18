import { MIME_TYPES } from "@mantine/dropzone";
import { createFormContext } from "@mantine/form";

import { FileDto } from "@/services/api/artist/artistSchemas";

export const MAX_FILE_SIZE = 20 * 1024 ** 2;

export const ALBUM_IMAGE_TYPES = [MIME_TYPES.jpeg, MIME_TYPES.png];

export interface UploadedFileValue {
  file?: File;
  response?: FileDto;
}

export interface CreateFormValues {
  title: string;
  pka: string;
  cover_id: string | null;
  image?: UploadedFileValue;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<CreateFormValues>();
