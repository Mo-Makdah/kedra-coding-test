import { Unit, UnitFormType } from "@/types/unit";

import styles from "./index.module.css";
import { MUITextField } from "@/components/form/MUITextField";
import { useState } from "react";
import { MUISelect, SelectOption } from "@/components/form/MUISelect";
import Button from "@/components/form/Button";

type Props = {
  unit?: Unit;
  locationsOptions: SelectOption[];
  submitFormHandler: (unit: UnitFormType) => void;
  deleteUnitHandler: () => void;
  submitLoading: boolean;
  deleteLoading: boolean;
  formError: string;
};

const UnitForm = ({
  unit,
  locationsOptions,
  submitFormHandler,
  deleteLoading,
  formError,
  submitLoading,
}: Props) => {
  const [formFields, setFormFields] = useState<UnitFormType>(
    unit
      ? {
          capacity: unit.capacity,
          locationId: unit.locationId,
          macAddress: unit.macAddress,
          name: unit.name,
        }
      : { capacity: 0, locationId: 0, macAddress: "", name: "" }
  );

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
        required
      />
      <MUISelect
        onChange={(value) => {
          inputChangeHandler("locationId", value);
        }}
        label="Location address"
        value={formFields.locationId}
        options={locationsOptions}
        required
      />
      <MUITextField
        onChange={(value) => {
          inputChangeHandler("name", value);
        }}
        label="Unit name"
        value={formFields.name}
        required
      />
      {!!formError && <div>{formError}</div>}
      <div className={styles.buttons}>
        {unit && (
          <Button theme="delete" loading={deleteLoading}>
            Delete
          </Button>
        )}
        <Button
          theme="primary"
          onClick={() => {
            submitFormHandler(formFields);
          }}
          loading={submitLoading}
        >
          {unit ? "Edit" : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default UnitForm;
