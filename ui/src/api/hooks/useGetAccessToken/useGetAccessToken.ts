import axios from "axios";
import { formatDiscogsTokenResponse } from "../../utils";
import { useQuery } from "react-query";
import { AccessTokenBody } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export const useGetAccessToken = (searchParams: URLSearchParams) => {
  const navigate = useNavigate();

  const getAccessToken = async (): Promise<AccessTokenBody> => {
    try {
      const {
        signInUserSession: {
          idToken: { jwtToken },
        },
      } = await Auth.currentAuthenticatedUser();
      const { data } = await axios.post(
        "https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/auth/access-token",
        {
          oauth_token: searchParams.get("oauth_token"),
          oauth_token_secret: localStorage.getItem(
            "discogs_oauth_token_secret"
          ),
          oauth_verifier: searchParams.get("oauth_verifier"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        }
      );
      const formattedBody = formatDiscogsTokenResponse(data);
      localStorage.setItem(
        "discogs_oauth_access_token",
        `${formattedBody.oauth_token}`
      );

      localStorage.setItem(
        "discogs_oauth_access_token_secret",
        `${formattedBody.oauth_token_secret}`
      );
      localStorage.removeItem("discogs_oauth_token");
      localStorage.removeItem("discogs_oauth_token_secret");
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
