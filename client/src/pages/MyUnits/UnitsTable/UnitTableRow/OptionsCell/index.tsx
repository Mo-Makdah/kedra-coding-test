import OptionsIcon from "@/components/icons/optionsIcon";
import Popover from "@mui/material/Popover";
import styles from "./index.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { paths } from "@/router/paths";

type Props = {
  unitId: number;
  deleteHandler: (unitId: number) => void;
};

const OptionsCell = ({ unitId, deleteHandler }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isOpen = !!anchorEl;

  return (
    <td>
      <div className={styles.optionsIcon} onClick={handleClick}>
        <OptionsIcon />
      </div>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={styles.dropdownContent}>
          <NavLink to={`${paths.unitDetailsPath}/${unitId}`}>Edit</NavLink>
          <p
            onClick={() => {
              deleteHandler(unitId);
            }}
          >
            Delete
          </p>
        </div>
      </Popover>
    </td>
  );
};

export default OptionsCell;
