import axios from "axios";
import { useMutation } from "react-query";
import { DiscogsGetCollectionReleases } from "../../../types";
import { Auth } from "aws-amplify";

type DiscogsSyncProps = {
  releaseIds: number[];
};

const formatBody = (userId: string, releaseIds: number[]) => {
  return {
    userId: userId,
    albumIds: releaseIds,
    oauthToken: localStorage.getItem("discogs_oauth_access_token"),
    oauthTokenSecret: localStorage.getItem("discogs_oauth_access_token_secret"),
    discogsUsername: localStorage.getItem("discogs_username"),
  };
};
export const useDiscogsSync = (options: object = {}) => {
  const discogsSync = async (
    props: DiscogsSyncProps
  ): Promise<DiscogsGetCollectionReleases> => {
    const { releaseIds } = props;
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
        `https://kkuv0fzer5.execute-api.us-east-1.amazonaws.com/dev/discogs/collections/sync`,
        formatBody(userId, releaseIds),
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
  return useMutation(["discogsAllCollectionResources"], discogsSync, {
    ...options,
  });
};
