import { useState } from "react";
import {
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DiscogsGetCollectionReleases } from "../../../types";

export interface ReleaseListProps {
  data: DiscogsGetCollectionReleases;
  isLoading: boolean;
}

export const AlbumSelectList = (props: ReleaseListProps) => {
  const { data } = props;
  const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (value: number) => {
    const currentIndex = checked.indexOf(value) as number;
    const newChecked: number[] = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDeselectAll = () => {
    setChecked([]);
  };

  const handleSelectAll = () => {
    const allReleaseIds: number[] = data.releases?.map(
      (release) => release.basic_information.id
    );
    setChecked(allReleaseIds);
  };
  return (
    <List>
      <ListItem>
        <Chip label="Deselect All" onClick={handleDeselectAll}></Chip>
        <Chip label="Select All" onClick={handleSelectAll}></Chip>
      </ListItem>
      {data.releases?.map((release, i) => (
        <ListItem
          key={`${release.basic_information.id}-${i}`}
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={() => handleToggle(release.basic_information.id)}
              checked={checked.indexOf(release.basic_information.id) !== -1}
              inputProps={{
                "aria-labelledby": `${release.basic_information.id}`,
              }}
            />
          }
        >
          <ListItemButton>
            <ListItemText primary={release?.basic_information.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
