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
