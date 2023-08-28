import { FC, useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import { AccessTokenBody } from "../../types/api";
import { useGetAccessToken } from "../../api/hooks";

export const DiscogsAuthTokenLoading: FC = () => {
  const [searchParams] = useSearchParams();

  const { isLoading } = useGetAccessToken(searchParams);
  return <>{isLoading && <CircularProgress size="large" />}</>;
};
