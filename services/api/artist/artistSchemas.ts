export type FileDto = {
  id: string;
  name: string;
  tags: string[];
  mime_type: string;
  url: string;
  key: string;
  user_id: string;
  created_by_id: string;
  updated_by_id: string;
  /**
   * @format date-time
   */
  created_at: string;
  /**
   * @format date-time
   */
  updated_at: string;
};

export type CreateAlbumDto = {
  title: string;
  pka: string;
  cover_id: string | null;
};

export type AlbumDto = {
  id: string;
  title: string;
  pka: string;
  cover_id: string;
  files: FileDto[];
};
