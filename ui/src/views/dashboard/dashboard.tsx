import { FC } from "react";
import { useGetCollectionReleases, useGetDiscogsIdentity } from "../../api";
import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";
export const Dashboard: FC = () => {
  const { data: identityData } = useGetDiscogsIdentity();
  const { data } = useGetCollectionReleases(identityData?.username as string);
  return (
    <>
      <h3>DashBoard</h3>
      <Grid sx-={{ width: "100%" }}>
        {data?.releases.map((release, i) => (
          <Grid item key={i} xs={3}>
            <Card sx={{ maxWidth: 275, height: "100%" }}>
              <CardMedia
                component="img"
                height="194"
                image={release.basic_information.cover_image}
                alt="Paella dish"
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
    </>
  );
};
