import { FC, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import {
  useDiscogsSync,
  useGetCollectionReleases,
  useGetDiscogsIdentity,
} from "../../../api";
import { AlbumSelectList } from "./albumSelect";
import { DiscogsGetCollectionReleases } from "../../../types";
import { release } from "../../../types/api";

export interface SyncModalProps {
  open: boolean;
  // selectedValue: string;
  onClose: () => void;
}

export const SyncModal: FC<SyncModalProps> = (props: SyncModalProps) => {
  const { open, onClose } = props;
  const [releaseIds, setReleaseIds] = useState<number[]>([]);

  const { mutate: discogsSync } = useDiscogsSync();
  const { data: identityData } = useGetDiscogsIdentity();

  const { data } = useGetCollectionReleases(
    identityData?.username as string,
    "all"
  );

  const getReleasesByReleaseIds = (
    releaseIds: number[],
    releases: release[]
  ): release[] => {
    const results: release[] = [];
    releaseIds.forEach((releaseId) => {
      const release = releases.find((release) => release.id === releaseId);
      results.push(release as release);
    });
    return results;
  };
  const handleClick = () => {
    data &&
      discogsSync({
        releases: getReleasesByReleaseIds(releaseIds, data?.releases),
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ padding: "10em" }}>
      <DialogTitle>Sync Discogs Collection With Wax Matcher</DialogTitle>
      <Button variant="contained" onClick={handleClick}>
        Start Sync
      </Button>
      {!!data && (
        <AlbumSelectList
          data={data as DiscogsGetCollectionReleases}
          releaseIds={releaseIds}
          setReleaseIds={setReleaseIds}
        />
      )}
    </Dialog>
  );
};
