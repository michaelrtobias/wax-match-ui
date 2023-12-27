import { FC, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import {
  useDiscogsSync,
  useGetCollectionReleases,
  useGetDiscogsIdentity,
} from "../../../api";
import { AlbumSelectList } from "./albumSelect";
import { DiscogsGetCollectionReleases } from "../../../types";

export interface SyncModalProps {
  open: boolean;
  // selectedValue: string;
  onClose: () => void;
}

export const SyncModal: FC<SyncModalProps> = (props: SyncModalProps) => {
  const { open, onClose } = props;
  const [albumsIdsToSync, setAlbumIdsTosync] = useState([]);

  const { refetch } = useDiscogsSync();
  const { data: identityData } = useGetDiscogsIdentity();

  const { data, isLoading } = useGetCollectionReleases(
    identityData?.username as string,
    "all"
  );
  const handleClick = () => {
    refetch();
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
          isLoading={isLoading}
        />
      )}
    </Dialog>
  );
};
