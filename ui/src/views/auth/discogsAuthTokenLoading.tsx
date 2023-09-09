import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useGetAccessToken, useGetDiscogsIdentity } from "../../api";

export const DiscogsAuthTokenLoading: FC = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, isSuccess } = useGetAccessToken(searchParams);
  return <>{isLoading && <CircularProgress size="large" color="warning" />}</>;
};
