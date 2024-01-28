import { Stack, Typography } from "@mui/material";
import theme from "~/theme/theme";

export default function Header({ title, desc }: { title: string; desc: string }) {
  return (
    <Stack sx={{ marginBottom: "1rem" }}>
      <Typography variant="h3" color={theme.palette.text.primary} component="h1" sx={{ marginTop: "0.2rem", textTransform: "capitalize" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" color={theme.palette.text.secondary} component="h2">
        {desc}
      </Typography>
    </Stack>
  );
}
