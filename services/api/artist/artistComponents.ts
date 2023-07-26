import * as reactQuery from "@tanstack/react-query";
import type * as Fetcher from "@/services/api/fetcher";
import type * as Schemas from "@/services/api/artist/artistSchemas";
import { Fetch } from "@/services/api/fetcher";
import { useContext, Context } from "@/services/api/context";

/** ============================ SONG ================================ */

/** ============================ /api/v1/song ================================ */

export type SongControllerCreateError = Fetcher.ErrorWrapper<undefined>;

export type SongControllerCreateVariables = {
  body: Schemas.CreateSongDto;
} & Context["fetcherOptions"];

export const fetchSongControllerCreate = (
  variables: SongControllerCreateVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.SongDto,
    SongControllerCreateError,
    Schemas.CreateSongDto,
    {},
    {},
    {}
  >({ url: "/api/v1/song", method: "post", ...variables, signal });

export const useSongControllerCreate = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.SongDto,
      SongControllerCreateError,
      SongControllerCreateVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useContext();
  return reactQuery.useMutation<
    Schemas.SongDto,
    SongControllerCreateError,
    SongControllerCreateVariables
  >(
    (variables: SongControllerCreateVariables) =>
      fetchSongControllerCreate({ ...fetcherOptions, ...variables }),
    options
  );
};

/** ============================ /api/v1/song/{id} ================================ */

export type SongControllerFindOnePathParams = {
  id: string;
};

export type SongControllerFindOneError = Fetcher.ErrorWrapper<undefined>;
export type SongControllerFindOneVariables = {
  pathParams: SongControllerFindOnePathParams;
} & Context["fetcherOptions"];

export const fetchSongControllerFindOne = (
  variables: SongControllerFindOneVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.SongDto,
    SongControllerFindOneError,
    undefined,
    {},
    {},
    SongControllerFindOnePathParams
  >({ url: "/api/v1/song/{id}", method: "get", ...variables, signal });

export const useSongControllerFindOne = <TData = Schemas.SongDto>(
  variables: SongControllerFindOneVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      Schemas.SongDto,
      SongControllerFindOneError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useContext(options);
  return reactQuery.useQuery<
    Schemas.SongDto,
    SongControllerFindOneError,
    TData
  >(
    queryKeyFn({
      path: "/api/v1/song/{id}",
      operationId: "songControllerFindOne",
      variables,
    }),
    ({ signal }) =>
      fetchSongControllerFindOne({ ...fetcherOptions, ...variables }, signal),
    { ...options, ...queryOptions }
  );
};

/** ============================ ALBUM ================================ */

/** ============================ /api/v1/album ================================ */

export type AlbumControllerCreateError = Fetcher.ErrorWrapper<undefined>;

export type AlbumControllerCreateVariables = {
  body: Schemas.CreateAlbumDto;
} & Context["fetcherOptions"];

export const fetchAlbumControllerCreate = (
  variables: AlbumControllerCreateVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.AlbumDto,
    AlbumControllerCreateError,
    Schemas.CreateAlbumDto,
    {},
    {},
    {}
  >({ url: "/api/v1/album", method: "post", ...variables, signal });

export const useAlbumControllerCreate = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.AlbumDto,
      AlbumControllerCreateError,
      AlbumControllerCreateVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useContext();
  return reactQuery.useMutation<
    Schemas.AlbumDto,
    AlbumControllerCreateError,
    AlbumControllerCreateVariables
  >(
    (variables: AlbumControllerCreateVariables) =>
      fetchAlbumControllerCreate({ ...fetcherOptions, ...variables }),
    options
  );
};

/** ============================ /api/v1/album ================================ */

export type AlbumControllerFindAllQueryParams = {
  name?: string;
  offset?: number;
  limit?: number;
};

export type AlbumControllerFindAllError = Fetcher.ErrorWrapper<undefined>;

export type AlbumControllerFindAllResponse = {
  total: number;
  limit: number;
  offset: number;
  count: number;
  results: Schemas.AlbumDto[];
};

export type AlbumControllerFindAllVariables = {
  queryParams?: AlbumControllerFindAllQueryParams;
} & Context["fetcherOptions"];

export const fetchAlbumControllerFindAll = (
  variables: AlbumControllerFindAllVariables,
  signal?: AbortSignal
) =>
  Fetch<
    AlbumControllerFindAllResponse,
    AlbumControllerFindAllError,
    undefined,
    {},
    AlbumControllerFindAllQueryParams,
    {}
  >({ url: "/api/v1/album", method: "get", ...variables, signal });

export const useAlbumControllerFindAll = <
  TData = AlbumControllerFindAllResponse
>(
  variables: AlbumControllerFindAllVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      AlbumControllerFindAllResponse,
      AlbumControllerFindAllError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useContext(options);
  return reactQuery.useQuery<
    AlbumControllerFindAllResponse,
    AlbumControllerFindAllError,
    TData
  >(
    queryKeyFn({
      path: "/api/v1/album",
      operationId: "albumControllerFindAll",
      variables,
    }),
    ({ signal }) =>
      fetchAlbumControllerFindAll({ ...fetcherOptions, ...variables }, signal),
    {
      ...options,
      ...queryOptions,
    }
  );
};

/** ============================ /api/v1/album/{id} ================================ */

export type AlbumControllerFindOnePathParams = {
  id: string;
};

export type AlbumControllerFindOneError = Fetcher.ErrorWrapper<undefined>;
export type AlbumControllerFindOneVariables = {
  pathParams: AlbumControllerFindOnePathParams;
} & Context["fetcherOptions"];

export const fetchAlbumControllerFindOne = (
  variables: AlbumControllerFindOneVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.AlbumDto,
    AlbumControllerFindOneError,
    undefined,
    {},
    {},
    AlbumControllerFindOnePathParams
  >({ url: "/api/v1/album/{id}", method: "get", ...variables, signal });

export const useAlbumControllerFindOne = <TData = Schemas.AlbumDto>(
  variables: AlbumControllerFindOneVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      Schemas.AlbumDto,
      AlbumControllerFindOneError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } = useContext(options);
  return reactQuery.useQuery<
    Schemas.AlbumDto,
    AlbumControllerFindOneError,
    TData
  >(
    queryKeyFn({
      path: "/api/v1/album/{id}",
      operationId: "albumControllerFindOne",
      variables,
    }),
    ({ signal }) =>
      fetchAlbumControllerFindOne({ ...fetcherOptions, ...variables }, signal),
    { ...options, ...queryOptions, staleTime: 1000 * 60 * 10 }
  );
};

/** ============================ FILE ================================ */

/** ============================ /api/v1/file/{id} ================================ */

export type FileControllerUpdateFilePathParams = {
  id: string;
};

export type FileControllerUpdateFileError = Fetcher.ErrorWrapper<undefined>;

export type FileControllerUpdateFileRequestBody = {
  /**
   * @format binary
   */
  file: Blob;
  tags?: string[] | null;
};

export type FileControllerUpdateFileVariables = {
  body: FileControllerUpdateFileRequestBody;
  pathParams: FileControllerUpdateFilePathParams;
} & Context["fetcherOptions"];

export const fetchFileControllerUpdateFile = (
  variables: FileControllerUpdateFileVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.FileDto,
    FileControllerUpdateFileError,
    FileControllerUpdateFileRequestBody,
    {},
    {},
    FileControllerUpdateFilePathParams
  >({ url: "/api/v1/file/{id}", method: "patch", ...variables, signal });

export const useFileControllerUpdateFile = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.FileDto,
      FileControllerUpdateFileError,
      FileControllerUpdateFileVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useContext();
  return reactQuery.useMutation<
    Schemas.FileDto,
    FileControllerUpdateFileError,
    FileControllerUpdateFileVariables
  >(
    (variables: FileControllerUpdateFileVariables) =>
      fetchFileControllerUpdateFile({ ...fetcherOptions, ...variables }),
    options
  );
};

/** ============================ /api/v1/file ================================ */

export type FileControllerUploadFileError = Fetcher.ErrorWrapper<undefined>;

export type FileControllerUploadFileRequestBody = {
  /**
   * @format binary
   */
  file: Blob;
  tags?: string[] | null;
};

export type FileControllerUploadFileVariables = {
  body: FileControllerUploadFileRequestBody;
} & Context["fetcherOptions"];

export const fetchFileControllerUploadFile = (
  variables: FileControllerUploadFileVariables,
  signal?: AbortSignal
) =>
  Fetch<
    Schemas.FileDto,
    FileControllerUploadFileError,
    FileControllerUploadFileRequestBody,
    {},
    {},
    {}
  >({ url: "/api/v1/file", method: "post", ...variables, signal });

export const useFileControllerUploadFile = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.FileDto,
      FileControllerUploadFileError,
      FileControllerUploadFileVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useContext();
  return reactQuery.useMutation<
    Schemas.FileDto,
    FileControllerUploadFileError,
    FileControllerUploadFileVariables
  >(
    (variables: FileControllerUploadFileVariables) =>
      fetchFileControllerUploadFile({ ...fetcherOptions, ...variables }),
    options
  );
};
