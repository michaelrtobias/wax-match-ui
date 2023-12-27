import axios from "axios";
import { useQuery } from "react-query";
import { DiscogsGetCollectionReleases } from "../../../types";
import { Auth } from "aws-amplify";

export const useDiscogsSync = (options: object = {}) => {
  const discogsSync = async (): Promise<DiscogsGetCollectionReleases> => {
    try {
      const {
        signInUserSession: {
          idToken: { jwtToken },
        },
      } = await Auth.currentAuthenticatedUser();
      const {
        attributes: { sub: userId },
      } = await Auth.currentUserInfo();

      const { data } = await axios.post(
        `https://kkuv0fzer5.execute-api.us-east-1.amazonaws.com/dev/discogs/collections/sync?oauth_token=${localStorage.getItem(
          "discogs_oauth_access_token"
        )}&oauth_token_secret=${localStorage.getItem(
          "discogs_oauth_access_token_secret"
        )}&discogs_username=${localStorage.getItem(
          "discogs_username"
        )}&wmuserid=${userId}`,
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
  return useQuery(["discogsAllCollectionResources"], discogsSync, {
    enabled: false,
    ...options,
  });
};
