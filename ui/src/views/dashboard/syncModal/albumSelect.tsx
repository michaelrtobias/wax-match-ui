import {
  Checkbox,
  Chip,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DiscogsGetCollectionReleases } from "../../../types";
import { FC, useState } from "react";
import _ from "lodash";
import { artists, basic_information, release } from "../../../types/api";

export interface ReleaseListProps {
  data: DiscogsGetCollectionReleases;
  releaseIds: number[];
  setReleaseIds: (value: number[]) => void;
}

export const AlbumSelectList: FC<ReleaseListProps> = (
  props: ReleaseListProps
) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, releaseIds, setReleaseIds } = props;

  const toLowerCaseObjStringValues = (obj: basic_information | artists) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value == "string"
          ? value.toLowerCase()
          : typeof value == "number"
          ? value.toString()
          : value,
      ])
    );
  };

  const includesValue = (
    val: string,
    obj: basic_information | artists
  ): boolean =>
    _.some(toLowerCaseObjStringValues(obj), (v) =>
      _.includes(v as string, val.toLowerCase())
    );

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
    <>
      <TextField
        id="outlined"
        // label="Search for inventory"
        value={searchTerm}
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment:
            searchTerm.length > 0 ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={() => {
                    setSearchTerm("");
                  }}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
      <List>
        <ListItem>
          <Chip label={`Releases to be synced:  ${releaseIds.length}`}></Chip>
          <Chip label="Deselect All" onClick={handleDeselectAll}></Chip>
          <Chip label="Select All" onClick={handleSelectAll}></Chip>
        </ListItem>
        {data.releases
          ?.filter(
            (release) =>
              includesValue(searchTerm, release.basic_information) ||
              includesValue(searchTerm, release.basic_information.artists[0])
          )
          .map((release, i) => (
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
    </>
  );
};
