import { FC, useEffect, useState } from "react";
import { Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import { RequestTokenBody } from "../../types";
import Cookies from "js-cookie";

const formatRequestTokenBody = (body: string): RequestTokenBody => {
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

export const DiscogsAuth: FC = () => {
  const [token, setToken] = useState("" as string);
  const getRequestToken = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        "https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/auth/request-token"
      );
      const formattedBody = formatRequestTokenBody(data);
      console.log("formatted body", formattedBody);
      Cookies.set("discogs_oauth_token", `${formattedBody.oauth_token}`);
      Cookies.set(
        "discogs_oauth_token_secret",
        `${formattedBody.oauth_token_secret}`
      );
      setToken(formattedBody.oauth_token);
      console.log("request token", formattedBody.oauth_token);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useEffect(() => {
    getRequestToken();
  }, []);
  return (
    <>
      <Typography variant="h1">Discogs auth page</Typography>
      <Typography variant="h3">Would you like to sign into discogs?</Typography>
      <Typography variant="h3">{token}</Typography>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          href={`https://discogs.com/oauth/authorize?oauth_token=${token}`}
        >
          Yes
        </Button>
        <Button variant="outlined" href="/dashboard">
          Continue to Wax Match and clear cookies if exists
        </Button>
      </Stack>
    </>
  );
};
