import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { FormEvent, useEffect, useState } from "react";
import actionServer from "./action.server";
import useClientMessage from "~/hooks/useClientMessage";
import { InputField } from "~/components/InputField";
import { EmailValidator, MaxLengthValidator, MinLengthValidator, RequiredValidator, useForb } from "forb";
import { DataResponse } from "~/data-response";
import { InLoginDto } from "~/dtos/loginDtos";

export const action = async (args: ActionFunctionArgs) => {
  return actionServer(args);
};

export const meta: MetaFunction = () => {
  return [
    { title: "Auth - GoPOS" },
    {
      name: "description",
      content:
        "GoPOS is a POS application that revolutionizes retail business management. With an intuitive interface and advanced features, GoPOS provides an efficient and comprehensive user experience to enhance operational effectiveness and business growth.",
    },
  ];
};

export default function LoginPage() {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const forb = useForb();
  const navigate = useNavigation();
  const actionData = useActionData<DataResponse<any>>();
  const { handle } = useClientMessage();

  const submitHandler = (e: FormEvent) => {
    if (!forb.validate()) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (navigate.state == "submitting") {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  }, [navigate.state]);

  useEffect(() => {
    handle(actionData);
  }, [actionData]);
  return (
    <>
      <Stack sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <Box>
          <img src="/assets/logo.png" width={350} height="100%" alt="logo attendify" />
        </Box>
        <Typography
          variant="h5"
          component="h1"
          mb="2rem"
          sx={{ fontFamily: "poppins", fontSize: "25px", color: "gray.500" }}
        >
          Sign In
        </Typography>
        <Form method="post" onSubmit={submitHandler} replace>
          <Stack sx={{ width: "400px" }} spacing={2}>
            <InputField
              name="username"
              label="Username"
              forb={forb}
              validators={[
                new RequiredValidator("Field ini tidak boleh kosong"),
                new MinLengthValidator(8, "Minimun 8 karakter"),
                new MaxLengthValidator(25, "Maksimum 25 karakter"),
              ]}
              type="text"
              disabled={isSubmitting}
            />
            <InputField
              name="password"
              label="Password"
              forb={forb}
              validators={[
                new RequiredValidator("Field ini tidak boleh kosong"),
                new MinLengthValidator(8, "Minimun 8 karakter"),
                new MaxLengthValidator(25, "Maksimum 25 karakter"),
              ]}
              type="password"
              disabled={isSubmitting}
            />
            <Button
              onClick={submitHandler}
              type="submit"
              variant="contained"
              disableElevation
              disabled={isSubmitting}
              fullWidth
              sx={{ paddingY: "0.7rem", boxShadow: "none" }}
            >
              Sign In
            </Button>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}
