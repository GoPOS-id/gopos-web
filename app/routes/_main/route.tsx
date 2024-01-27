import { Box, Container, Toolbar } from "@mui/material";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import { loaderServer } from "./loader.server";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";
import { useEffect } from "react";
import AppBars from "./AppBars";

export const loader = async (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};

export default function Layout() {
  const loaders = useLoaderData<DataResponse<inUserDto>>();
  return (
    <Box display="flex" sx={{ backgroundColor: "#F0FAFD", minHeight: "100vh" }}>
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
