import { Box, Container, Toolbar } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { loaderServer } from "./loader.server";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";
import AppBars from "./AppBars";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";

export const loader = async (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};

export default function Layout() {
  const loaders = useLoaderData<DataResponse<inUserDto>>();
  return (
    <Box display="flex" sx={{ backgroundColor: "#F7FDFF", minHeight: "100vh" }}>
      <AppBars title={loaders.data.fullname!} />
      <Sidebar />
      <Box component="main" flexGrow={1} p={1}>
        <Toolbar />
        <Container sx={{ paddingTop: "1.5rem" }} maxWidth="xl">
          <Breadcrumb />
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
