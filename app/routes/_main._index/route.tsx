import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import defaultTheme from "~/theme/theme";
import TodayOrders from "./today-orders";
import ProfileCard from "./profile-card";
import OutletInformation from "./outlet-informations";
import SelfInformation from "./self-information";
import { Grid } from "@mui/material";
import { loaderServer } from "../_main/loader.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - GoPOS" },
    {
      name: "description",
      content:
        "GoPOS is a POS application that revolutionizes retail business management. With an intuitive interface and advanced features, GoPOS provides an efficient and comprehensive user experience to enhance operational effectiveness and business growth.",
    },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};

export default function Index() {
  return (
    <>
      <Header title="dashboard" desc="Your Bussiness, Your Rules" />
      <Grid container spacing={2}>
        <Grid item md={9} sm={12}>
          <SelfInformation />
          <OutletInformation />
        </Grid>
        <Grid item md={3} sm={12}>
          <ProfileCard />
        </Grid>
      </Grid>
      <TodayOrders />
    </>
  );
}
