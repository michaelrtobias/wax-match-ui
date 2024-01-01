import axios from "axios";
import { useMutation } from "react-query";
import { DiscogsGetCollectionReleases } from "../../../types";
import { Auth } from "aws-amplify";
import { release } from "../../../types/api";

type DiscogsSyncProps = {
  releases: release[];
};

const formatBody = (userId: string, releases: release[]) => {
  return {
    userId: userId,
    releases: releases,
    oauthToken: localStorage.getItem("discogs_oauth_access_token"),
    oauthTokenSecret: localStorage.getItem("discogs_oauth_access_token_secret"),
    discogsUsername: localStorage.getItem("discogs_username"),
  };
};
export const useDiscogsSync = (options: object = {}) => {
  const discogsSync = async (
    props: DiscogsSyncProps
  ): Promise<DiscogsGetCollectionReleases> => {
    const { releases } = props;
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
        formatBody(userId, releases),
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
