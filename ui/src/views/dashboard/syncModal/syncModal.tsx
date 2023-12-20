import { FC } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { useGetAllCollectionReleases } from "../../../api";

export interface SyncModalProps {
  open: boolean;
  // selectedValue: string;
  onClose: () => void;
}

export const SyncModal: FC<SyncModalProps> = (props: SyncModalProps) => {
  const { open, onClose } = props;
  const { refetch } = useGetAllCollectionReleases();

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
    </Dialog>
  );
};
