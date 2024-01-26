import { Stack, Typography } from "@mui/material";

export default function Header({ title, desc }: { title: string; desc: string }) {
  return (
    <Stack sx={{ marginBottom: "2rem" }}>
      <Typography variant="h3" component="h1" sx={{ marginTop: "0.2rem", textTransform: "capitalize" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="h2" color="gray">
        {desc}
      </Typography>
    </Stack>
  );
}
