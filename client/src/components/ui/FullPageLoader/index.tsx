import { CircularProgress } from "@mui/material";

import styles from "./index.module.css";

export const FullPageLoader = () => {
  return (
    <div className={`${styles.container}`}>
      <CircularProgress size={60} color="primary" value={50} />
    </div>
  );
};
