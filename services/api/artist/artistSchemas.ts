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

export type ImageDto = {
  id: string;
  name: string;
  url: string;
  key: string;
  mime_type: string;
  url_expiry: null | Date;
  created_at: Date;
  updated_at: Date;
  created_by_id: string;
  updated_by_id: string;
};

export type AlbumDto = {
  id: string;
  title: string;
  pka: string;
  cover_id: string;
  files: FileDto[];
  cover?: ImageDto;
  songs: any[];
};

export type CreateSongDto = {
  title: string;
  album_id: string;
  genre: string;
  mood: string[];
  tags: string[];
  length: number;
  bpm: number;
  instrumental: boolean;
  languages: string[];
  vocal_ranges: string[];
  musical_key: string;
  music_id: string;
  /**
   * @format date-time
   */
  recording_date: string;
  recording_location: string;
  recording_country: string;
  art_id: string;
  pka: string;
  price: number;
};

export type SongDto = {
  id: string;
  title: string;
  album_id: string;
  genre: string;
  mood: string[];
  tags: string[];
  length: number;
  bpm: number;
  instrumental: boolean;
  languages: string[];
  vocal_ranges: string[];
  musical_key: string;
  music_id: string;
  /**
   * @format date-time
   */
  recording_date: string;
  recording_location: string;
  recording_country: string;
  art_id: string;
  pka: string;
  price: number;
};
