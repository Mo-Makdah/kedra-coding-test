import { Unit } from "@/types/unit";
import OptionsCell from "./OptionsCell";

type Props = {
  unit: Unit;
};
const UnitTableRow = ({ unit }: Props) => {
  const { id, locationAddress, capacity } = unit;
  return (
    <tr>
      <td>{id}</td>
      <td>{locationAddress}</td>
      <td>{capacity}</td>
      <OptionsCell />
    </tr>
  );
};

export default UnitTableRow;
