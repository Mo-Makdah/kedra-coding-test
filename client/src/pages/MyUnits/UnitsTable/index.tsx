import { Unit } from "@/types/unit";
import styles from "./index.module.css";
import UnitTableRow from "./UnitTableRow";

type Props = {
  units: Unit[];
  delteUnitHandler: (unitId: number) => void;
};

const UnitsTable = ({ units, delteUnitHandler }: Props) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location Address</th>
          <th>Unit Capacity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {units.map((unit) => (
          <UnitTableRow
            unit={unit}
            key={unit.id}
            delteUnitHandler={delteUnitHandler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UnitsTable;
