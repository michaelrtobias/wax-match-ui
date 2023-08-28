import { FC } from "react";
import { Typography, Button, Stack } from "@mui/material";
import { useGetRequestToken } from "../../api";

export const DiscogsAuth: FC = () => {
  const { data: token, isLoading } = useGetRequestToken();

  return (
    <>
      <Typography variant="h1">Discogs auth page</Typography>
      <Typography variant="h3">Would you like to sign into discogs?</Typography>
      <Typography variant="h3">{token?.oauth_token}</Typography>
      <Stack spacing={2} direction="row">
        <Button
          disabled={isLoading}
          variant="contained"
          href={`https://discogs.com/oauth/authorize?oauth_token=${token?.oauth_token}`}
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
