import { Container } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Outlet />
    </Container>
  );
}
