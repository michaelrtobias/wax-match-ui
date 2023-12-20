import axios from "axios";
import { useQuery } from "react-query";
import { DiscogsIdentity } from "../../../types";
import { Auth } from "aws-amplify";

export const useGetDiscogsIdentity = () => {
  const getDiscogsIdentity = async (): Promise<DiscogsIdentity> => {
    try {
      const {
        signInUserSession: {
          idToken: { jwtToken },
        },
      } = await Auth.currentAuthenticatedUser();
      const { data } = await axios.get(
        `https://kkuv0fzer5.execute-api.us-east-1.amazonaws.com/dev/discogs/identity?oauth_token=${localStorage.getItem(
          "discogs_oauth_access_token"
        )}&oauth_token_secret=${localStorage.getItem(
          "discogs_oauth_access_token_secret"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        }
      );
      localStorage.setItem("discogs_username", data.username);
      localStorage.setItem("discogs_resource_url", data.resource_url);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return useQuery(["discogsIdentity"], getDiscogsIdentity);
};
