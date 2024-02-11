import { MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import { useRouteLoaderData } from "@remix-run/react";
import { EmailValidator, MaxLengthValidator, MinLengthValidator, RequiredValidator, UseForbReturn } from "forb";
import { InputField } from "~/components/InputField";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";

export const UserForms = ({ forb }: { forb: UseForbReturn }) => {
  const profile = useRouteLoaderData<DataResponse<inUserDto>>("routes/_main");
  return (
    <>
      <Stack spacing={2} direction="column">
        <InputField
          name="username"
          label="Username"
          forb={forb}
          validators={[new RequiredValidator("Field ini tidak boleh kosong"), new MinLengthValidator(8, "Minimun 8 karakter"), new MaxLengthValidator(25, "Maksimum 25 karakter")]}
          type="text"
        />
        <InputField
          name="fullname"
          label="Fullname"
          forb={forb}
          validators={[new RequiredValidator("Field ini tidak boleh kosong"), new MinLengthValidator(8, "Minimun 8 karakter"), new MaxLengthValidator(25, "Maksimum 25 karakter")]}
          type="text"
        />
        <InputField
          name="password"
          label="Password"
          forb={forb}
          validators={[new RequiredValidator("Field ini tidak boleh kosong"), new MinLengthValidator(8, "Minimun 8 karakter"), new MaxLengthValidator(25, "Maksimum 25 karakter")]}
          type="password"
        />
        <InputField
          name="email"
          label="Email"
          forb={forb}
          validators={[new RequiredValidator("Field ini tidak boleh kosong"), new EmailValidator("Field ini harus berisi format email")]}
          type="text"
        />
        <Select defaultValue={3} name="role_id">
          {profile?.data.role == "operator" && <MenuItem value={1}>Operator</MenuItem>}
          {profile?.data.role == "operator" && <MenuItem value={2}>Administrator</MenuItem>}
          <MenuItem value={3} selected>
            Cashier
          </MenuItem>
        </Select>
      </Stack>
    </>
  );
};
