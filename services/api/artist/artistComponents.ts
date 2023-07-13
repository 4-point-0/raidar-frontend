import * as reactQuery from "@tanstack/react-query";
import type * as Fetcher from "@/services/api/fetcher";
import type * as Schemas from "@/services/api/artist/artistSchemas";
import { Fetch } from "@/services/api/fetcher";
import { useContext, Context } from "@/services/api/context";

export type AlbumControllerCreateError = Fetcher.ErrorWrapper<undefined>;

/** ============================ /api/v1/album ================================ */

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
