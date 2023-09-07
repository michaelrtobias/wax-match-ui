import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useGetAccessToken } from "../../api/hooks";

export const DiscogsAuthTokenLoading: FC = () => {
  const [searchParams] = useSearchParams();

  const { isLoading } = useGetAccessToken(searchParams);
  return <>{isLoading && <CircularProgress size="large" color="warning" />}</>;
};
