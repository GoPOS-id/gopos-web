import {
  AccountBalanceOutlined,
  AccountBalanceWalletOutlined,
  AssignmentOutlined,
  MoneyOutlined,
  PersonOutline,
  ReceiptOutlined,
  SellOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { CardWidget, InformationWidget } from "~/components/Widget";
import { loaderServer } from "../_main/loader.server";
import { inUserDto } from "~/dtos/userDtos";
import { DataResponse } from "~/data-response";
import { useLoaderData } from "@remix-run/react";
import { formatDate, formatNumber } from "~/utils/formatUtils";

export const loader = async (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};

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

export default function Index() {
  const loaders = useLoaderData<DataResponse<inUserDto>>();

  return (
    <>
      <Header title="dashboard" desc="Your Bussiness, Your Rules" />
      <Grid container spacing={2}>
        <Grid item md={8} sm={12}>
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
                <InformationWidget backgroundColor="#E0F8EA" iconBackgroundColor="#B1F1CC" icon={ShoppingCartOutlined} title="Total Transactions" value={formatNumber("2332232")} />
              </Grid>
              <Grid item md={6} sm={12}>
                <InformationWidget backgroundColor="#FCEAE4" iconBackgroundColor="#F8D4C8" icon={ReceiptOutlined} title="Last Transaction" value="#11155512354112" />
              </Grid>
            </Grid>
          </CardWidget>
          <CardWidget>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Card variant="outlined" sx={{ borderRadius: "10px", padding: "14.5px", borderColor: "#E3EBEE" }}>
                  <Box width="100%">
                    <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                        <ShoppingBagOutlined fontSize="large" color="success" />
                        <Typography color="text.primary" fontWeight="600" fontSize={20}>
                          Total Orders
                        </Typography>
                        <Typography fontSize={10} color="text.secondary">
                          (This year)
                        </Typography>
                      </Stack>
                      <Typography color="success.main" fontFamily="poppins" fontWeight="medium" fontSize={20}>
                        {formatNumber("1155205")}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box width="100%">
                    <Stack direction="row" sx={{ marginTop: "1rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="text.primary" fontWeight="medium">
                        Today
                      </Typography>
                      <Typography color="text.secondary">{formatNumber("1155205")}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ marginTop: "0.5rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="text.primary" fontWeight="medium">
                        This Week
                      </Typography>
                      <Typography color="text.secondary">{formatNumber("1155205")}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ marginTop: "0.5rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="text.primary" fontWeight="medium">
                        This Month
                      </Typography>
                      <Typography color="text.secondary">{formatNumber("1155205")}</Typography>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={6} sm={12}>
                <Card variant="outlined" sx={{ borderRadius: "10px", padding: "14.5px", borderColor: "#E3EBEE" }}>
                  <Box width="100%">
                    <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                        <AccountBalanceWalletOutlined fontSize="large" color="primary" />
                        <Typography color="text.primary" fontWeight="600" fontSize={20}>
                          Total Earn
                        </Typography>
                        <Typography fontSize={10} color="text.secondary">
                          (This year)
                        </Typography>
                      </Stack>
                      <Typography color="primary.main" fontFamily="poppins" fontWeight="medium" fontSize={20}>
                        Rp {formatNumber("1000000000000")}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box width="100%">
                    <Stack direction="row" sx={{ marginTop: "1rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="text.primary" fontWeight="medium">
                        Today
                      </Typography>
                      <Typography color="text.secondary">Rp {formatNumber("1155205")}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ marginTop: "0.5rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="text.primary" fontWeight="medium">
                        This Week
                      </Typography>
                      <Typography color="text.secondary">Rp {formatNumber("1155205")}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ marginTop: "0.5rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="text.primary" fontWeight="medium">
                        This Month
                      </Typography>
                      <Typography color="text.secondary">Rp {formatNumber("1155205")}</Typography>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </CardWidget>
        </Grid>
        <Grid item md={4} sm={12}>
          <CardWidget sx={{ height: "100%" }}>Test2</CardWidget>
        </Grid>
      </Grid>
    </>
  );
}
