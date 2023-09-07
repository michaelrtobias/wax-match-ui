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
        `https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/identity?oauth_token=${localStorage.getItem(
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
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return useQuery(["discogsIdentity"], getDiscogsIdentity);
};
