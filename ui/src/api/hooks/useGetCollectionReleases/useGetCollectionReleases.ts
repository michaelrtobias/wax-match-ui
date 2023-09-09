import axios from "axios";
import { useQuery } from "react-query";
import { DiscogsGetCollectionReleases } from "../../../types";
import { Auth } from "aws-amplify";

export const useGetCollectionReleases = (
  username: string,
  per_page?: number,
  page = 1,
  options: object = {}
) => {
  const getCollectionReleases =
    async (): Promise<DiscogsGetCollectionReleases> => {
      try {
        const {
          signInUserSession: {
            idToken: { jwtToken },
          },
        } = await Auth.currentAuthenticatedUser();
        const { data } = await axios.get(
          `https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/collections/releases?oauth_token=${localStorage.getItem(
            "discogs_oauth_access_token"
          )}&oauth_token_secret=${localStorage.getItem(
            "discogs_oauth_access_token_secret"
          )}&discogs_username=${localStorage.getItem("discogs_username")}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: jwtToken,
            },
          }
        );
        return data as DiscogsGetCollectionReleases;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
  return useQuery(["discogsCollectionResources"], getCollectionReleases, {
    enabled: !!username,
    ...options,
  });
};
