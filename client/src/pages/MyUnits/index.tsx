import { Unit } from "@/types/unit";
import UnitsTable from "./UnitsTable";
import styles from "./index.module.css";
import Button from "@/components/form/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import { useLocation, useRoutes } from "react-router-dom";
import { paths } from "@/router/paths";

const MOCK_UNITS: Unit[] = [
  {
    id: 1,
    name: "Unit 1",
    capacity: 10,
    macAddress: "00:00:00:00:00:00",
    locationId: 1,
    locationAddress: "Address 1",
  },
  {
    id: 2,
    name: "Unit 2",
    capacity: 20,
    macAddress: "00:00:00:00:00:00",
    locationId: 2,
    locationAddress: "Address 2",
  },
  {
    id: 3,
    name: "Unit 3",
    capacity: 30,
    macAddress: "00:00:00:00:00:00",
    locationId: 3,
    locationAddress: "Address 3",
  },
];

const MyUnitsPage = () => {
  const router = useLocation();

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

      <UnitsTable units={MOCK_UNITS} />
    </div>
  );
};

export default MyUnitsPage;
