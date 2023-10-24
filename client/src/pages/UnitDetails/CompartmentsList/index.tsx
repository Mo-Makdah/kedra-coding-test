import { Compartment, CompartmentFormType } from "@/types/compartment";

import { useState } from "react";

import styles from "./index.module.css";
import CompartmentRow from "./CompartmentRow";
import { CreateCompartment } from "@/api/calls/compartment/createCompartmentapi";
import { FullPageLoader } from "@/components/ui/FullPageLoader";
import Button from "@/components/form/Button";
import { Unit } from "@/types/unit";

type Props = {
  compartments: Compartment[];
  unit: Unit;
  setUnit: (value: React.SetStateAction<Unit | undefined>) => void;
};
const CompartmentsList = ({ compartments, unit, setUnit }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCompartmentHandler = async (input: CompartmentFormType) => {
    setIsLoading(true);

    const { data, errorMessage } = await CreateCompartment(input);
    if (data) {
      setUnit((state) => {
        if (!state) return state;
        return {
          ...state,
          compartments: state.compartments
            ? [...state.compartments, data]
            : [data],
        };
      });
    } else {
      alert(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className={styles.list}>
          <div className={styles.buttonContainer}>
            <Button
              theme="primary"
              onClick={() => {
                createCompartmentHandler({ capacity: 0, unitId: unit.id });
              }}
            >
              Add Compartment
            </Button>
          </div>
          {compartments.map((compartment) => (
            <CompartmentRow
              compartment={compartment}
              setLoadingHandler={(loading: boolean) => {
                setIsLoading(loading);
              }}
              setUnit={setUnit}
              unit={unit}
              key={compartment.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CompartmentsList;
