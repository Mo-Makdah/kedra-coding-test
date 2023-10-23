import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import UnitsTable from "./UnitsTable";
import styles from "./index.module.css";
import Button from "@/components/form/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import { paths } from "@/router/paths";
import { getUnits } from "@/api/calls/unit/getUnits.api";
import { FullPageLoader } from "@/components/ui/FullPageLoader";
import { deleteUnit } from "@/api/calls/unit/deleteUnit.api";

const MyUnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");

  const getUnitsHandler = async () => {
    setFetchError("");
    setLoading(true);

    const { data, errorMessage } = await getUnits();

    if (data) {
      setUnits(data);
    } else {
      setFetchError(errorMessage);
    }

    setLoading(false);
  };

  const asyncDelteUnitHandler = async (unitId: number) => {
    setFetchError("");
    setLoading(true);

    const { data, errorMessage } = await deleteUnit(unitId);

    if (data) {
      setUnits((prev) => prev?.filter((unit) => unit.id !== unitId));
    } else {
      setFetchError(errorMessage);
    }

    setLoading(false);
  };

  const delteUnitHandler = (unitId: number) => {
    asyncDelteUnitHandler(unitId);
  };

  useEffect(() => {
    getUnitsHandler();
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h3>Units</h3>
        <Button theme="primary" href={paths.unitDetailsPath}>
          <div className={styles.addButton}>
            <PlusIcon />
            <span>Add Unit</span>
          </div>
        </Button>
      </div>

      {fetchError ? (
        <div>{fetchError}</div>
      ) : !units || loading ? (
        <FullPageLoader />
      ) : (
        <UnitsTable units={units} delteUnitHandler={delteUnitHandler} />
      )}
    </div>
  );
};

export default MyUnitsPage;
