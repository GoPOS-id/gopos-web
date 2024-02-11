import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";
import { useLoaderData } from "@remix-run/react";
import { CardWidget } from "~/components/Widget";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { AvatarUtils } from "~/utils/avatarUtils";
import { EmailOutlined, KeyOutlined, VerifiedOutlined } from "@mui/icons-material";
import defaultTheme from "~/theme/theme";

export default function ProfileCard() {
  const loaders = useLoaderData<DataResponse<inUserDto>>()!;
  return (
    <CardWidget sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box width="100%">
        <Stack width="100%" display="flex" justifyContent="center" alignItems="center">
          <Avatar {...AvatarUtils.stringAvatar(loaders.data.fullname!)} sx={{ width: 111, height: 111, fontSize: 111 / 3, marginBottom: "17px" }} />
          <Typography fontSize={18} color="text.primary" fontWeight="medium" sx={{ textTransform: "capitalize", display: "flex", alignItems: "center", marginBottom: "7px" }}>
            {loaders.data.fullname!} <VerifiedOutlined sx={{ marginLeft: "9px" }} color="primary" fontSize="small" />
          </Typography>
          <Typography fontSize="small" color="text.secondary" marginBottom="31px">
            ID: {loaders.data.id!}
          </Typography>
          <Card variant="outlined" sx={{ borderColor: "#E3EBEE", borderRadius: "8px", width: "100%", padding: "10px", marginBottom: "14px" }}>
            <Stack direction="row" display="flex" alignItems="center">
              <Box padding="6px" sx={{ backgroundColor: "#DCEDFF", borderRadius: "4px", display: "flex", justifyContent: "center" }}>
                <EmailOutlined fontSize="large" color="inherit" sx={{ color: defaultTheme.palette.secondary.light }} />
              </Box>
              <Stack marginLeft="9px">
                <Typography color="text.primary" fontSize={12} fontWeight="medium">
                  Email Address
                </Typography>
                <Typography color="text.secondary" fontSize={10}>
                  {loaders.data.email!}
                </Typography>
              </Stack>
            </Stack>
          </Card>
          <Card variant="outlined" sx={{ borderColor: "#E3EBEE", borderRadius: "8px", width: "100%", padding: "10px" }}>
            <Stack direction="row" display="flex" alignItems="center">
              <Box padding="6px" sx={{ backgroundColor: "#D4F8FC", borderRadius: "4px", display: "flex", justifyContent: "center" }}>
                <KeyOutlined fontSize="large" color="inherit" sx={{ color: defaultTheme.palette.primary.main }} />
              </Box>
              <Stack marginLeft="9px">
                <Typography color="text.primary" fontSize={12} fontWeight="medium">
                  Role
                </Typography>
                <Typography color="text.secondary" textTransform="capitalize" fontSize={10}>
                  {loaders.data.role!}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </CardWidget>
  );
}
