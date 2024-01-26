import { TextField } from "@mui/material";
import { UseForbReturn, validator, Validator } from "forb";
import { useRef } from "react";

export function InputField({
  name,
  label,
  forb,
  validators,
  disabled = false,
  value,
  type,
}: {
  name: string;
  label: string;
  forb: UseForbReturn;
  validators?: Validator[];
  disabled?: boolean;
  value?: string;
  type?: string;
}) {
  const data = useRef(value ?? "");
  return forb.register({
    validator: () => validator(data.current, validators ?? []),
    render: (errorMessage) => (
      <TextField
        fullWidth
        name={name}
        label={label}
        disabled={disabled}
        defaultValue={data.current}
        onChange={(e) => (data.current = e.target.value)}
        helperText={errorMessage}
        error={!!errorMessage}
        variant="outlined"
        type={type}
      />
    ),
  });
}
