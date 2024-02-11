import { AssignmentOutlined, PersonOutline, ReceiptOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { CardWidget, InformationWidget } from "~/components/Widget";
import { formatDate, formatNumber } from "~/utils/formatUtils";
import { useRouteLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";

export default function SelfInformation() {
  const loaders = useRouteLoaderData<DataResponse<inUserDto>>("routes/_main")!;
  return (
    <CardWidget sx={{ marginBottom: "20px" }}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <InformationWidget backgroundColor="#FFF5E0" iconBackgroundColor="#FFE9BC" icon={PersonOutline} title="Username" value={loaders.data.username!} />
        </Grid>
        <Grid item md={6} sm={12}>
          <InformationWidget
            backgroundColor="#EFE6F6"
            iconBackgroundColor="#E7D1F8"
            icon={AssignmentOutlined}
            title="Register Since"
            value={formatDate({ date: loaders.data.created_at! })}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <InformationWidget backgroundColor="#E0F8EA" iconBackgroundColor="#B1F1CC" icon={ShoppingCartOutlined} title="Total Orders" value={formatNumber("2332232")} />
        </Grid>
        <Grid item md={6} sm={12}>
          <InformationWidget backgroundColor="#FCEAE4" iconBackgroundColor="#F8D4C8" icon={ReceiptOutlined} title="Last Orders" value="#11155512354112" />
        </Grid>
      </Grid>
    </CardWidget>
  );
}
