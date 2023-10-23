import { Compartment } from "@/types/compartment";

import styles from "./index.module.css";
import CompartmentRow from "./CompartmentRow";

type Props = {
  compartments: Compartment[];
};
const CompartmentsList = ({ compartments }: Props) => {
  return (
    <div className={styles.list}>
      {compartments.map((compartment) => (
        <CompartmentRow compartment={compartment} />
      ))}
    </div>
  );
};

export default CompartmentsList;
