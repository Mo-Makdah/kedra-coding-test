import { Unit } from "@/types/unit";

import styles from "./index.module.css";
import { MUITextField } from "@/components/form/MUITextField";
import { useState } from "react";

type Props = {
  unit?: Unit;
};

const UnitForm = ({ unit }: Props) => {
  const [formFields, setFormFields] = useState<Partial<Unit>>(unit ?? {});

  const inputChangeHandler = <T extends keyof Unit>(
    inputName: T,
    changes: Unit[T]
  ) => {
    setFormFields((state) => ({ ...state, [inputName]: changes }));
  };

  return (
    <div className={styles.form}>
      <MUITextField
        onChange={(value) => {
          inputChangeHandler("macAddress", value);
        }}
        label="MAC address of the unit"
        value={formFields.macAddress}
      />
      <MUITextField<number>
        onChange={(value) => {
          inputChangeHandler("locationId", value);
        }}
        label="Location address"
        value={formFields.locationId}
      />
      <MUITextField
        onChange={(value) => {
          inputChangeHandler("name", value);
        }}
        label="Unit name"
        value={formFields.name}
      />
    </div>
  );
};

export default UnitForm;
