import { FC, useState } from "react";
import { useGetCollectionReleases, useGetDiscogsIdentity } from "../../api";
import { ReleaseList } from "./releaseList";
import { DiscogsGetCollectionReleases } from "../../types";
import { Button } from "@mui/material";
import { SyncModal } from "./syncModal";

export const Dashboard: FC = () => {
  const [open, setOpen] = useState(false);

  const { data: identityData } = useGetDiscogsIdentity();
  const { data } = useGetCollectionReleases(identityData?.username as string);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h3>DashBoard</h3>
      <Button variant="contained" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SyncModal open={open} onClose={handleClose} />
      <ReleaseList data={data as DiscogsGetCollectionReleases} />
    </>
  );
};
