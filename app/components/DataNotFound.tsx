import { ArchiveOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import theme from "~/theme/theme";

export default function DataNotFound() {
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      {/* <Box sx={{ borderRadius: "15%", p: "20px", backgroundColor: "#078FFF38", marginBottom: "10px" }}>
        <ArchiveOutlined sx={{ fontSize: "150px", color: theme.palette.primary.main }} />
      </Box> */}
      <Box position="relative" display="flex" justifyContent="center" marginBottom="2rem">
        <img src="/assets/EmptyInbox.png" width="250px" />
        <Typography position="absolute" sx={{ color: "#1F64E7", bottom: "5px" }} fontWeight="medium" fontSize={25}>
          Data is Empty
        </Typography>
      </Box>
    </Stack>
  );
}
