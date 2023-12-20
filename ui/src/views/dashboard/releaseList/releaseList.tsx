import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
import { DiscogsGetCollectionReleases } from "../../../types";

export interface ReleaseListProps {
  data: DiscogsGetCollectionReleases;
}

export const ReleaseList = (props: ReleaseListProps) => {
  const { data } = props;
  return (
    <Paper>
      <Grid sx-={{ width: "100%" }}>
        {data?.releases.map((release, i) => (
          <Grid item key={i} xs={3}>
            <Card sx={{ maxWidth: 275, height: "100%" }}>
              <CardMedia
                component="img"
                height="194"
                image={release.basic_information.cover_image}
                alt={release.basic_information.title}
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {release.basic_information.artists[0].name} -
                  {release.basic_information.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
