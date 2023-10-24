import { Compartment } from "@/types/compartment";
import { useState } from "react";

import styles from "./index.module.css";
import { MUITextField } from "@/components/form/MUITextField";
import Button from "@/components/form/Button";
import { updateCompartment } from "@/api/calls/compartment/updateCompartment.api";
import { deleteCompartment } from "@/api/calls/compartment/deleteCompartment.api";
import { useNavigate } from "react-router-dom";
import { paths } from "@/router/paths";
import { Unit } from "@/types/unit";

type Props = {
  compartment: Compartment;
  setLoadingHandler: (loading: boolean) => void;
  unit: Unit;
  setUnit: (value: React.SetStateAction<Unit | undefined>) => void;
};
const CompartmentRow = ({
  compartment,
  setLoadingHandler,
  setUnit,
  unit,
}: Props) => {
  const [editLoading, setEditLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const changeHandler = <T extends keyof Compartment>(
    inputName: T,
    changes: Compartment[T]
  ) => {
    setUnit((state) => {
      if (!state) return state;
      return {
        ...state,
        compartments: state.compartments.map((c) => {
          if (c.id === compartment.id) {
            return { ...c, [inputName]: changes };
          }
          return c;
        }),
      };
    });
  };

  const editHandler = async () => {
    setEditLoading(true);

    const { data, errorMessage } = await updateCompartment(compartment.id, {
      capacity: compartment.capacity,
    });
    if (data) {
      setUnit(
        (state) =>
          state && {
            ...state,
            compartments: state.compartments.map((compartment) => {
              if (compartment.id === data.id) {
                return data;
              }
              return compartment;
            }),
          }
      );
    } else {
      alert(errorMessage);
    }

    setEditLoading(false);
  };

  const deleteCompartmentHandler = async () => {
    setLoadingHandler(true);

    const { data, errorMessage } = await deleteCompartment(compartment.id);
    if (data) {
      setUnit(data);
      navigate(`${paths.unitDetailsPath}/${unit.id}`);
    } else {
      alert(errorMessage);
    }

    setLoadingHandler(false);
  };

  return (
    <div className={styles.row}>
      <MUITextField
        label="Compartment ID"
        value={compartment.id}
        onChange={() => {}}
        disabled
      />
      <MUITextField
        label="# of packages"
        value={compartment.capacity}
        onChange={(value) => {
          changeHandler("capacity", value);
        }}
      />
      <MUITextField
        label="cell MAC address"
        value={compartment.macAddress}
        onChange={() => {}}
        disabled
      />
      <Button
        theme="secondary"
        onClick={() => {
          editHandler();
        }}
        loading={editLoading}
      >
        Edit
      </Button>
      <Button
        theme="delete"
        onClick={() => {
          deleteCompartmentHandler();
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default CompartmentRow;
