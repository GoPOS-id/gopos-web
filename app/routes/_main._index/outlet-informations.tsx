import { AccountBalanceWalletOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { CardWidget } from "~/components/Widget";
import { formatNumber } from "~/utils/formatUtils";

export default function OutletInformation() {
  return (
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
                    (Today)
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
              <Stack direction="row" sx={{ marginTop: "0.5rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Typography color="text.primary" fontWeight="medium">
                  This Year
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
                    (Today)
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
              <Stack direction="row" sx={{ marginTop: "0.5rem", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Typography color="text.primary" fontWeight="medium">
                  This Year
                </Typography>
                <Typography color="text.secondary">Rp {formatNumber("1155205")}</Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </CardWidget>
  );
}
