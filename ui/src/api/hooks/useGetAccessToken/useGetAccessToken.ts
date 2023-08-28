import axios from "axios";
import { formatDiscogsTokenResponse } from "../../utils";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { AccessTokenBody } from "../../../types";
import { useNavigate } from "react-router-dom";

export const useGetAccessToken = (searchParams: URLSearchParams) => {
  const navigate = useNavigate();

  const getAccessToken = async (): Promise<AccessTokenBody> => {
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
      const formattedBody = formatDiscogsTokenResponse(data);
      console.log("formatted body", formattedBody);
      Cookies.set("discogs_oauth_access_token", `${formattedBody.oauth_token}`);
      Cookies.set(
        "discogs_oauth_access_token_secret",
        `${formattedBody.oauth_token_secret}`
      );
      console.log("access token", formattedBody.oauth_token);
      return formattedBody;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return useQuery(["requestToken"], getAccessToken, {
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      navigate("/discogs/auth");
    },
  });
};
