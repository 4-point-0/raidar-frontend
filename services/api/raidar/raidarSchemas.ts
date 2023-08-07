/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
export type GoogleLoginDto = {
  token: string;
};

export type UserDto = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  /**
   * @default user
   */
  roles: "user" | "artist";
  /**
   * @default google
   */
  provider?: "google";
  provider_id?: string;
  /**
   * @format date-time
   */
  created_at: string;
  /**
   * @format date-time
   */
  updated_at: string;
  wallet_address: string;
};

export type AddWalletDto = {
  id: string;
  wallet_address: string;
};

export type PaginatedDto = {
  total: number;
  take: number;
  skip: number;
  count: number;
  results: any[];
};

export type CreateSongDto = {
  title: string;
  album_id: string;
  genre?: string;
  mood?: string[];
  tags?: string[];
  length?: number;
  bpm?: number;
  instrumental?: boolean;
  languages?: string[];
  vocal_ranges?: string[];
  musical_key?: string;
  music_id: string;
  /**
   * @format date-time
   */
  recording_date: string;
  recording_country?: string;
  recording_location?: string;
  art_id: string;
  pka?: string;
  price: number;
};

export type FileDto = {
  id: string;
  /**
   * @format date-time
   */
  created_at: string;
  /**
   * @format date-time
   */
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
  name: string;
  url: string;
  key: string;
  mime_type: string;
  /**
   * @format date-time
   */
  url_expiry: string;
};

export type AlbumDto = {
  id: string;
  /**
   * @format date-time
   */
  created_at: string;
  /**
   * @format date-time
   */
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
  title: string;
  pka: string;
  cover: FileDto;
  songs: SongDto[];
};

export type ListingDto = {
  id: string;
  /**
   * @format date-time
   */
  created_at: string;
  /**
   * @format date-time
   */
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
  seller: UserDto;
  buyer: UserDto;
  tx_hash: string;
  price: number;
  price_in_near: string;
  price_in_near_formatted: string;
};

export type SongDto = {
  id: string;
  /**
   * @format date-time
   */
  created_at: string;
  /**
   * @format date-time
   */
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
  user_id: string;
  album?: AlbumDto;
  title: string;
  length: string;
  genre?: string | null;
  mood: string[];
  tags: string[];
  bpm?: string | null;
  instrumental?: boolean | null;
  languages: string[];
  vocal_ranges: string[];
  musical_key?: string | null;
  music: FileDto;
  /**
   * @format date-time
   */
  recording_date: string;
  recording_country: string;
  recording_location: string;
  art: FileDto;
  pka: string;
  last_listing?: ListingDto;
};

export type CreateAlbumDto = {
  title: string;
  pka?: string;
  cover_id: string;
};
