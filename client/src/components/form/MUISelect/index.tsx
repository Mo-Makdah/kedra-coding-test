import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export type SelectOption<T = number> = {
  value: T;
  label: string;
};

type Props<T extends string | number> = {
  label?: string;
  value?: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  required?: boolean;
};

export function MUISelect<T extends string | number = number>({
  onChange,
  value,
  label,
  options,
  required,
}: Props<T>) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as T);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{`${label}${
          required ? " *" : ""
        }`}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${value ?? ""}`}
          label={`${label}${required ? " *" : ""}`}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
