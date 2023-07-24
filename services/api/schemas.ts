export type UserDto = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  provider: string;
  provider_id: string;
  /**
   * @format date-time
   */
  created_at?: string;
  /**
   * @format date-time
   */
  updated_at?: string;
  wallet_address: string | null;
};

export type GoogleVerificationDto = {
  token: string;
};

export type NearLoginRequestDto = {
  username: string;
  signedJsonString: string;
};

export type NearLoginResponseDto = {
  token: string;
};

type LastListing = {
  id: string;
  seller: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    roles: string[];
    provider: string;
    provider_id: string;
    wallet_address: null;
    created_at: string;
    updated_at: string;
  };
  buyer: null;
  tx_hash: null;
  price: string;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
};

type Music = {
  id: string;
  name: string;
  url: string;
  key: string;
  mime_type: string;
  url_expiry: string | null;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
};

type Art = {
  id: string;
  name: string;
  url: string;
  key: string;
  mime_type: string;
  url_expiry: string | null;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
};

export type Song = {
  id: string;
  user_id: string;
  title: string;
  length: number;
  genre: string;
  mood: string[];
  tags: string[];
  bpm: number;
  instrumental: boolean;
  languages: string[];
  vocal_ranges: string[];
  musical_key: string;
  recording_date: string;
  recording_location: string;
  recording_country: string;
  pka: string;
  last_listing: LastListing;
  music: Music;
  art: Art;
  album: string | null;
};
