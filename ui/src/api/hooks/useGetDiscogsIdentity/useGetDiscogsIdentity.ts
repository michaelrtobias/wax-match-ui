import axios from "axios";
import { useQuery } from "react-query";
import { DiscogsIdentity } from "../../../types";

export const useGetDiscogsIdentity = () => {
  const getDiscogsIdentity = async (): Promise<DiscogsIdentity> => {
    try {
      const { data } = await axios.get(
        `https://vapshnrmeh.execute-api.us-east-1.amazonaws.com/dev/discogs/identity?oauth_token=${localStorage.getItem(
          "discogs_oauth_access_token"
        )}&oauth_token_secret=${localStorage.getItem(
          "discogs_oauth_access_token_secret"
        )}`
      );
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return useQuery(["discogsIdentity"], getDiscogsIdentity);
};
