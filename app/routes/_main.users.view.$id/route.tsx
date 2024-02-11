import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import loaderServer from "./loader.server";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";
import { Grid } from "@mui/material";
import ProfileCard from "./profile-card";
import UpdateForm from "./updateForm";
import actionServer from "./action.server";
import useClientMessage from "~/hooks/useClientMessage";
import { useEffect } from "react";

export const action = (args: ActionFunctionArgs) => {
  return actionServer(args);
};

export const loader = (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};

export const meta: MetaFunction<typeof loader> = ({ data }: { data: DataResponse<inUserDto> }) => {
  return [
    { title: `View ${data.data.id} - GoPOS` },
    {
      name: "description",
      content:
        "GoPOS is a POS application that revolutionizes retail business management. With an intuitive interface and advanced features, GoPOS provides an efficient and comprehensive user experience to enhance operational effectiveness and business growth.",
    },
  ];
};

export default function ViewPage() {
  const loaders = useLoaderData<DataResponse<inUserDto>>();

  return (
    <>
      <Header title="View Profile" desc="Show Detail User by ID" />
      {loaders.statusCode == 200 ? (
        <Grid container spacing={2}>
          <Grid item md={9} sm={12}>
            <UpdateForm loaders={loaders} />
          </Grid>
          <Grid item md={3} sm={12}>
            <ProfileCard />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}
