import axios from "axios";
import { formatDiscogsTokenResponse } from "../../utils";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { RequestTokenBody } from "../../../types";

export const useGetRequestToken = () => {
  const getRequestToken = async (): Promise<RequestTokenBody> => {
    try {
      const { data } = await axios.get(
        "https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/auth/request-token"
      );
      const formattedBody: RequestTokenBody = formatDiscogsTokenResponse(data);
      console.log("formatted body", formattedBody);
      Cookies.set("discogs_oauth_token", `${formattedBody.oauth_token}`);
      Cookies.set(
        "discogs_oauth_token_secret",
        `${formattedBody.oauth_token_secret}`
      );
      console.log("request token", formattedBody.oauth_token);
      return formattedBody;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return useQuery(["requestToken"], getRequestToken);
};
