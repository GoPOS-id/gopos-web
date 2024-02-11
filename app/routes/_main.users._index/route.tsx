import { Key, PersonAddOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useRouteLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { FormEvent, useEffect, useState } from "react";
import { useFeedback } from "~/components/Feedback";
import Header from "~/components/Header";
import { CardWidget } from "~/components/Widget";
import { DataResponse } from "~/data-response";
import { inCreateUserDto, inUserDto } from "~/dtos/userDtos";
import loaderServer from "./loader.server";
import UserTable from "./usersTable";
import { UserForms } from "./userForms";
import { useForb } from "forb";
import { actionServer } from "./action.server";
import useClientMessage from "~/hooks/useClientMessage";

const category = ["All", "Operator", "Administrator", "Cashier"];

export const meta: MetaFunction = () => {
  return [
    { title: "Users - GoPOS" },
    {
      name: "description",
      content:
        "GoPOS is a POS application that revolutionizes retail business management. With an intuitive interface and advanced features, GoPOS provides an efficient and comprehensive user experience to enhance operational effectiveness and business growth.",
    },
  ];
};

export const action = (args: ActionFunctionArgs) => {
  return actionServer(args);
};

export const loader = (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};

export default function UsersPage() {
  const [isCategory, setCategory] = useState<number>();
  const [isParamsCategory, setParamsCategory] = useSearchParams();
  const profile = useRouteLoaderData<DataResponse<inUserDto>>("routes/_main");
  const feedback = useFeedback();
  const forb = useForb();
  const submit = useSubmit();
  const actions = useActionData<DataResponse<any>>();
  const { handle } = useClientMessage();

  const handleAddUser = () => {
    feedback.showFormDialog({
      key: "addnewuser",
      title: "Add New User",
      children: <UserForms forb={forb} />,
      submitLabel: "Save",
      onSubmit: (e: FormEvent<HTMLFormElement>) => {
        if (!forb.validate()) {
          return false;
        }
        submit(e.currentTarget, { method: "POST" });
        return true;
      },
    });
  };

  useEffect(() => {
    handle(actions);
  }, [actions]);

  useEffect(() => {
    switch (isParamsCategory.get("category")) {
      case "operator":
        setCategory(1);
        break;
      case "administrator":
        setCategory(2);
        break;
      case "cashier":
        setCategory(3);
        break;
      default:
        setCategory(0);
        break;
    }
  }, []);

  useEffect(() => {
    switch (isCategory) {
      case 1:
        isParamsCategory.get("page") != null
          ? setParamsCategory({ category: "operator", page: isParamsCategory.get("page")! })
          : setParamsCategory({ category: "operator", page: "1" });
        break;
      case 2:
        isParamsCategory.get("page") != null
          ? setParamsCategory({ category: "administrator", page: isParamsCategory.get("page")! })
          : setParamsCategory({ category: "administrator", page: "1" });
        break;
      case 3:
        isParamsCategory.get("page") != null
          ? setParamsCategory({ category: "cashier", page: isParamsCategory.get("page")! })
          : setParamsCategory({ category: "cashier", page: "1" });
        break;
      default:
        isParamsCategory.get("page") != null ? setParamsCategory({ category: "all", page: isParamsCategory.get("page")! }) : setParamsCategory({ category: "all", page: "1" });
        break;
    }
  }, [isCategory]);
  return (
    <>
      <Header title="Users" desc="Manage your users and set permission here" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: profile?.data.role == "administrator" || profile?.data.role == "operator" ? "space-between" : "start",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Stack direction="row" spacing={1}>
          {category.map((val, i) => (
            <Button key={i} variant={isCategory == i ? "contained" : "outlined"} onClick={() => setCategory(i)} disableElevation>
              {val}
            </Button>
          ))}
        </Stack>
        {profile?.data.role == "administrator" || profile?.data.role == "operator" ? (
          <Button variant="contained" disableElevation startIcon={<PersonAddOutlined />} onClick={handleAddUser}>
            Add New
          </Button>
        ) : (
          <></>
        )}
      </Box>
      <CardWidget>
        <UserTable />
      </CardWidget>
    </>
  );
}
