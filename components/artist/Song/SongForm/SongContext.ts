import { MIME_TYPES } from "@mantine/dropzone";
import { createFormContext } from "@mantine/form";

import { FileDto } from "@/services/api/artist/artistSchemas";

export const MAX_FILE_SIZE = 20 * 1024 ** 2;

export const SONG_IMAGE_TYPES = [MIME_TYPES.jpeg, MIME_TYPES.png];

export const SONG_AUDIO_TYPES = [MIME_TYPES.mp4];

export interface UploadedFileValue {
  file?: File;
  response?: FileDto;
}

export interface CreateFormValues {
  title: string;
  genre: string;
  mood: string;
  tags: string;
  length: string;
  bpm: string;
  instrumental: string;
  languages: string;
  vocalRanges: string;
  musicalKey: string;
  musicId: string;
  recordingDate: string;
  recordingCountry: string;
  recordingLocation: string;
  pka: string;
  price: number;
  image?: UploadedFileValue;
  song?: UploadedFileValue;
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<CreateFormValues>();
