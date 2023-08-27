import { FC, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import { AccessTokenBody } from "../../types/api";

const formatDiscogsToken = (body: string): AccessTokenBody => {
  const result = {} as AccessTokenBody;
  const keyValueArray: string[] = body.split("&");
  keyValueArray.forEach((pair) => {
    const splitKeyValue: string[] = pair.split("=");
    const key = splitKeyValue[0];
    const value = splitKeyValue[1];
    result[key as keyof AccessTokenBody] = value as string;
  });
  return result;
};

export const DiscogsAuthTokenLoading: FC = () => {
  const [searchParams] = useSearchParams();

  const getAccessToken = async (): Promise<void> => {
    try {
      const { data } = await axios.post(
        "https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/auth/access-token",
        {
          oauth_token: searchParams.get("oauth_token"),
          oauth_token_secret: Cookies.get("discogs_oauth_token_secret"),
          oauth_verifier: searchParams.get("oauth_verifier"),
        }
      );
      console.log("access token: ", data);
      const formattedBody = formatDiscogsToken(data);
      console.log("formatted body", formattedBody);
      Cookies.set("discogs_oauth_access_token", `${formattedBody.oauth_token}`);
      Cookies.set(
        "discogs_oauth_access_token_secret",
        `${formattedBody.oauth_token_secret}`
      );
      console.log("access token", formattedBody.oauth_token);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  useEffect(() => {
    getAccessToken();
  });
  return (
    <>
      <Typography variant="h3">Loading.....</Typography>
    </>
  );
};
