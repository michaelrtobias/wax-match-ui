import axios from "axios";
import { formatDiscogsTokenResponse } from "../../utils";
import { useQuery } from "react-query";
import { RequestTokenBody } from "../../../types";
import { Auth } from "aws-amplify";

export const useGetRequestToken = () => {
  const getRequestToken = async (): Promise<RequestTokenBody> => {
    try {
      const {
        signInUserSession: {
          idToken: { jwtToken },
        },
      } = await Auth.currentAuthenticatedUser();
      const { data } = await axios.get(
        "https://kkuv0fzer5.execute-api.us-east-1.amazonaws.com/dev/discogs/auth/request-token",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        }
      );
      const formattedBody: RequestTokenBody = formatDiscogsTokenResponse(data);
      localStorage.setItem(
        "discogs_oauth_token",
        `${formattedBody.oauth_token}`
      );
      localStorage.setItem(
        "discogs_oauth_token_secret",
        `${formattedBody.oauth_token_secret}`
      );
      return formattedBody;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return useQuery(["requestToken"], getRequestToken);
};
