import {
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DiscogsGetCollectionReleases } from "../../../types";
import { FC } from "react";

export interface ReleaseListProps {
  data: DiscogsGetCollectionReleases;
  releaseIds: number[];
  setReleaseIds: (value: number[]) => void;
}

export const AlbumSelectList: FC<ReleaseListProps> = (
  props: ReleaseListProps
) => {
  const { data, releaseIds, setReleaseIds } = props;

  const handleToggle = (value: number) => {
    const currentIndex = releaseIds.indexOf(value) as number;
    const newChecked: number[] = [...releaseIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setReleaseIds(newChecked);
  };

  const handleDeselectAll = () => {
    setReleaseIds([]);
  };

  const handleSelectAll = () => {
    const allReleaseIds: number[] = data.releases?.map((release) => release.id);
    setReleaseIds(allReleaseIds);
  };
  return (
    <List>
      <ListItem>
        <Chip label="Deselect All" onClick={handleDeselectAll}></Chip>
        <Chip label="Select All" onClick={handleSelectAll}></Chip>
      </ListItem>
      {data.releases?.map((release, i) => (
        <ListItem key={`${release.id}-${i}`} disablePadding>
          <ListItemButton onClick={() => handleToggle(release.id)}>
            <ListItemText
              primary={`${release.basic_information.artists[0].name} - ${release?.basic_information.title}`}
            />
            <Checkbox
              edge="start"
              checked={releaseIds.indexOf(release.id) !== -1}
              disableRipple
              inputProps={{
                "aria-labelledby": `${release.id}`,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
