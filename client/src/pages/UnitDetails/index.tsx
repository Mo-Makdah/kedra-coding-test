import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { paths } from "@/router/paths";
import BackArrowIcon from "@/components/icons/backArrowIcon";
import UnitForm from "./UnitForm";
import { Unit } from "@/types/unit";

const UnitDetailsPage = () => {
  const [unit, setUnit] = useState<Unit>();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const unitId = params.id;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <NavLink to={paths.unitsPath} className={styles.backButton}>
          <BackArrowIcon />
          <span>Details</span>
        </NavLink>
      </div>
      <div className={styles.title}>
        {unitId ? `Unit ID: ${unitId}` : "Create Unit"}
      </div>
      <UnitForm />
    </div>
  );
};

export default UnitDetailsPage;
