import * as reactQuery from "@tanstack/react-query";

import { Context, useContext } from "./context";
import type * as Fetcher from "./fetcher";

import { Fetch } from "./fetcher";

import type * as Schemas from "./schemas";

/** ============================ /api/v1/google/sign-in-backend ================================ */

export type GoogleControllerGoogleAuthError = Fetcher.ErrorWrapper<undefined>;

export type GoogleControllerGoogleAuthVariables = Context["fetcherOptions"];

export const fetchGoogleControllerGoogleAuth = (
  variables: GoogleControllerGoogleAuthVariables,
  signal?: AbortSignal
) =>
  Fetch<undefined, GoogleControllerGoogleAuthError, undefined, {}, {}, {}>({
    url: "/api/v1/google/sign-in-backend",
    method: "get",
    ...variables,
    signal,
  });

export const useGoogleControllerGoogleAuth = <TData = undefined>(
  variables: GoogleControllerGoogleAuthVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      undefined,
      GoogleControllerGoogleAuthError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useContext(options);
  return reactQuery.useQuery<undefined, GoogleControllerGoogleAuthError, TData>(
    queryKeyFn({
      path: "/api/v1/google/sign-in-backend",
      operationId: "googleControllerGoogleAuth",
      variables,
    }),
    ({ signal }) =>
      fetchGoogleControllerGoogleAuth(
        { ...fetcherOptions, ...variables },
        signal
      ),
    {
      ...options,
      ...queryOptions,
    }
  );
};

/** ============================ /api/v1/google/auth ================================ */

export type GoogleControllerAuthenticateError = Fetcher.ErrorWrapper<undefined>;

export type GoogleControllerAuthenticateVariables = {
  body: Schemas.GoogleVerificationDto;
} & Context["fetcherOptions"];

export const fetchGoogleControllerAuthenticate = (
  variables: GoogleControllerAuthenticateVariables,
  signal?: AbortSignal
) =>
  Fetch<
    undefined,
    GoogleControllerAuthenticateError,
    Schemas.GoogleVerificationDto,
    {},
    {},
    {}
  >({ url: "/api/v1/google/auth", method: "post", ...variables, signal });

export const useGoogleControllerAuthenticate = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      undefined,
      GoogleControllerAuthenticateError,
      GoogleControllerAuthenticateVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useContext();
  return reactQuery.useMutation<
    undefined,
    GoogleControllerAuthenticateError,
    GoogleControllerAuthenticateVariables
  >(
    (variables: GoogleControllerAuthenticateVariables) =>
      fetchGoogleControllerAuthenticate({ ...fetcherOptions, ...variables }),
    options
  );
};

/** ============================ /api/v1/admin/me ================================ */

export type controllerFindMeError = Fetcher.ErrorWrapper<undefined>;

export type controllerFindMeVariables = Context["fetcherOptions"];

export const fetchControllerFindMe = (
  variables: controllerFindMeVariables,
  signal?: AbortSignal
) =>
  Fetch<Schemas.UserDto, controllerFindMeError, undefined, {}, {}, {}>({
    url: "/api/v1/user/me",
    method: "get",
    ...variables,
    signal,
  });

export const useControllerFindMe = <TData = Schemas.UserDto>(
  variables: controllerFindMeVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<Schemas.UserDto, controllerFindMeError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useContext(options);
  return reactQuery.useQuery<Schemas.UserDto, controllerFindMeError, TData>(
    queryKeyFn({
      path: "/api/v1/user/me",
      operationId: "controllerFindMe",
      variables,
    }),
    ({ signal }) =>
      fetchControllerFindMe({ ...fetcherOptions, ...variables }, signal),
    {
      ...options,
      ...queryOptions,
    }
  );
};

/** ============================ /api/v1/user/add-wallet ================================ */

export type AuthControllerNearLoginError = Fetcher.ErrorWrapper<undefined>;

export type AuthControllerNearLoginVariables = {
  body: Schemas.NearLoginRequestDto;
} & Context["fetcherOptions"];

export const fetchAuthControllerNearLogin = (
  variables: AuthControllerNearLoginVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.NearLoginResponseDto,
    AuthControllerNearLoginError,
    Schemas.NearLoginRequestDto,
    {},
    {},
    {}
  >({ url: "/api/v1/user/add-wallet", method: "post", ...variables, signal });

export const useAuthControllerNearLogin = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.NearLoginResponseDto,
      AuthControllerNearLoginError,
      AuthControllerNearLoginVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useContext();
  return reactQuery.useMutation<
    Schemas.NearLoginResponseDto,
    AuthControllerNearLoginError,
    AuthControllerNearLoginVariables
  >(
    (variables: AuthControllerNearLoginVariables) =>
      fetchAuthControllerNearLogin({ ...fetcherOptions, ...variables }),
    options
  );
};

/** ============================ QueryOperation ================================ */

export type QueryOperation =
  | {
      path: "/api/v1/google/sign-in-backend";
      operationId: "googleControllerGoogleAuth";
      variables: GoogleControllerGoogleAuthVariables;
    }
  | {
      path: "/api/v1/user/me";
      operationId: "controllerFindMe";
      variables: controllerFindMeVariables;
    };
