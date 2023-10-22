import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import styles from "./index.module.css";

type Props<T extends string | number> = {
  label?: string;
  type?: "text" | "number";
  value?: T;
  onChange: (value: T) => void;
};

export function MUITextField<T extends string | number = string>({
  type = "text",
  onChange,
  value,
  label,
}: Props<T>) {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label={label}
        variant="outlined"
        sx={{
          width: "100%",
        }}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      />
    </Box>
  );
}
