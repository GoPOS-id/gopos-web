import { SaveAltOutlined } from "@mui/icons-material";
import { Button, Divider, MenuItem, Select, Stack } from "@mui/material";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { EmailValidator, MaxLengthValidator, MinLengthValidator, RequiredValidator, useForb } from "forb";
import { FormEvent, useEffect, useState } from "react";
import { InputField } from "~/components/InputField";
import { CardWidget } from "~/components/Widget";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";
import { FormDataUtils } from "~/utils/formconvertUtils";
import actionServer from "./action.server";
import { ActionFunctionArgs } from "@remix-run/node";
import useClientMessage from "~/hooks/useClientMessage";
import { useFeedback } from "~/components/Feedback";

const roles = ["operator", "administrator", "cashier"];

const findRole = (role: string) => {
  return roles.indexOf(role) + 1;
};

export default function UpdateForm({ loaders }: { loaders: DataResponse<inUserDto> }) {
  const forb = useForb();
  const submit = useSubmit();
  const feedback = useFeedback();
  const { handle } = useClientMessage();
  const actions = useActionData<DataResponse<any>>();
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (!forb.validate) {
      e.preventDefault();
    } else {
      e.preventDefault();
      const data = e.currentTarget;
      feedback.showConfirmationDialog({
        key: "confirm",
        title: "Confirmation",
        message: "Are you sure to change information?",
        onOk: () => {
          submit(data, { method: "PATCH" });
        },
      });
    }
  };

  useEffect(() => {
    handle(actions);
  }, [actions]);
  return (
    <CardWidget>
      <form onSubmit={submitHandler}>
        <Stack spacing={2}>
          <input type="hidden" name="id" value={FormDataUtils.convertToString(loaders.data.id)} />
          <input type="hidden" name="username" value={loaders.data.username} />
          <InputField
            name="fullname"
            label="Fullname"
            forb={forb}
            validators={[
              new RequiredValidator("Field ini tidak boleh kosong"),
              new MaxLengthValidator(25, "Maksimum 25 karakter"),
              new MinLengthValidator(8, "Minimum 8 karakter"),
            ]}
            value={loaders.data.fullname}
            type="text"
          />
          <InputField
            name="email"
            label="Email"
            forb={forb}
            validators={[new RequiredValidator("Field ini tidak boleh kosong"), new EmailValidator("Field ini harus berformat Email")]}
            value={loaders.data.email}
            type="text"
          />
          <Select defaultValue={findRole(loaders.data.role!)} name="role_id">
            <MenuItem value={1} selected={loaders.data.role == "operator" ? true : false}>
              Operator
            </MenuItem>
            <MenuItem value={2} selected={loaders.data.role == "administrator" ? true : false}>
              Administrator
            </MenuItem>
            <MenuItem value={3} selected={loaders.data.role == "cashier" ? true : false}>
              Cashier
            </MenuItem>
          </Select>
          <Divider />
          <InputField
            name="password"
            label="Change Password"
            forb={forb}
            validators={[new MaxLengthValidator(25, "Maksimum 25 karakter"), new MinLengthValidator(8, "Minimum 8 karakter")]}
            type="password"
          />
          <Stack direction="row" gap={2}>
            <Button type="submit" variant="contained" disableElevation startIcon={<SaveAltOutlined />}>
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </form>
    </CardWidget>
  );
}
