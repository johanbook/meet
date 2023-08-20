import { ResponseError } from "src/api";

async function reponseErrorToMessage(
  error: ResponseError
): Promise<string | undefined> {
  const response = error.response;

  if (response.bodyUsed) {
    return;
  }

  const json = await response.json();

  if ("message" in json) {
    return json["message"];
  }

  return response.statusText;
}

export async function errorToMessage(
  error: unknown
): Promise<string | undefined> {
  if (error instanceof ResponseError) {
    return reponseErrorToMessage(error);
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "There was an error";
}
