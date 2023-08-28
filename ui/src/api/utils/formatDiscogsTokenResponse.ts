import { RequestTokenBody, AccessTokenBody } from "../../types";

export const formatDiscogsTokenResponse = (
  body: string
): RequestTokenBody | AccessTokenBody => {
  const result = {} as RequestTokenBody;
  const keyValueArray: string[] = body.split("&");
  keyValueArray.forEach((pair) => {
    const splitKeyValue: string[] = pair.split("=");
    const key = splitKeyValue[0];
    const value = splitKeyValue[1];
    result[key as keyof RequestTokenBody] = value as string;
  });
  return result;
};
