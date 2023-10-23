import { Unit } from "@/types/unit";
import OptionsCell from "./OptionsCell";

type Props = {
  unit: Unit;
  delteUnitHandler: (unitId: number) => void;
};
const UnitTableRow = ({ unit, delteUnitHandler }: Props) => {
  const { id, location, capacity } = unit;
  return (
    <tr>
      <td>{id}</td>
      <td>{location}</td>
      <td>{capacity}</td>
      <OptionsCell unitId={id} deleteHandler={delteUnitHandler} />
    </tr>
  );
};

export default UnitTableRow;
