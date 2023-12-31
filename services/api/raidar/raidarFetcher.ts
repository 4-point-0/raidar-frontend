import FormData from "form-data";
import { getSession } from "next-auth/react";
import { RaidarContext } from "./raidarContext";

const baseUrl = "https://api.raidar.xyz"; // TODO add your baseUrl

export type ErrorWrapper<TError> =
  | TError
  | { status: "unknown"; payload: string };

export type RaidarFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
  signal?: AbortSignal;
} & RaidarContext["fetcherOptions"];

export async function raidarFetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {}
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: RaidarFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  try {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    const session = await getSession();

    if (
      !(
        requestHeaders.hasOwnProperty("authorization") ||
        requestHeaders.hasOwnProperty("Authorization")
      )
    ) {
      requestHeaders["Authorization"] = session?.token
        ? `Bearer ${session.token}`
        : "";
    }

    /**
     * As the fetch API is being used, when multipart/form-data is specified
     * the Content-Type header must be deleted so that the browser can set
     * the correct boundary.
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sending_files_using_a_formdata_object
     */
    if (requestHeaders["Content-Type"].toLowerCase().includes(" ")) {
      delete requestHeaders["Content-Type"];
    }

    const isFileUpload = body?.hasOwnProperty("file");
    let formData: any = new FormData();

    if (isFileUpload) {
      delete requestHeaders["Content-Type"];

      const { file, tags, songId } = body as any;

      console.log("songid", songId);

      formData.append("file", file);

      if (tags) {
        formData.append("tags", tags.toString());
      }

      if (songId) {
        formData.append("songId", songId.toString());
      }
    }

    const serializedBody = body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined;

    const response = await fetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        signal,
        method: method.toUpperCase(),
        body: isFileUpload ? formData : serializedBody,
        headers: requestHeaders,
      }
    );

    if (!response.ok) {
      let error: ErrorWrapper<TError>;

      try {
        error = await response.json();
      } catch (e) {
        error = {
          status: "unknown" as const,
          payload:
            e instanceof Error
              ? `Unexpected error (${e.message})`
              : "Unexpected error",
        };
      }

      throw error;
    }

    if (response.headers.get("content-type")?.includes("json")) {
      return await response.json();
    } else {
      return (await response.blob()) as unknown as TData;
    }
  } catch (e) {
    let errorObject: Error = {
      name: "unknown" as const,
      message:
        e instanceof Error ? `Network error (${e.message})` : "Network error",
      stack: e as string,
    };
    throw errorObject;
  }
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query;
};
