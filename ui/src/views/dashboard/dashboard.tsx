import { FC } from "react";
import { useGetDiscogsIdentity } from "../../api";
export const Dashboard: FC = () => {
  const { data } = useGetDiscogsIdentity();
  return <h3>DashBoard</h3>;
};
