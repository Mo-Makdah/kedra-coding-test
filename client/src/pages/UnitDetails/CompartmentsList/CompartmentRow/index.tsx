import { Compartment } from "@/types/compartment";
import { useState } from "react";

import styles from "./index.module.css";
import { MUITextField } from "@/components/form/MUITextField";

type Props = {
  compartment: Compartment;
};
const CompartmentRow = ({ compartment }: Props) => {
  const [compartmentForm, setCompartmentForm] =
    useState<Compartment>(compartment);

  const changeHandler = <T extends keyof Compartment>(
    inputName: T,
    changes: Compartment[T]
  ) => {
    setCompartmentForm((state) => ({ ...state, [inputName]: changes }));
  };

  return (
    <div className={styles.row}>
      <MUITextField
        label="Compartment ID"
        value={compartmentForm.id}
        onChange={(value) => {
          changeHandler("id", value);
        }}
      />
      <MUITextField
        label="Compartment ID"
        value={compartmentForm.id}
        onChange={(value) => {
          changeHandler("id", value);
        }}
      />
      <MUITextField
        label="Compartment ID"
        value={compartmentForm.id}
        onChange={(value) => {
          changeHandler("id", value);
        }}
      />
    </div>
  );
};

export default CompartmentRow;
