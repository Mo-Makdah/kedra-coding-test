import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
type Props = {
  theme: "primary" | "secondary" | "delete";
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  href?: string;
};

const Button = ({
  children,
  theme,
  disabled,
  loading,
  onClick,
  href,
}: React.PropsWithChildren<Props>) => {
  const styleTheme = styles[theme];

  if (href) {
    return (
      <NavLink to={href} className={`${styles.button} ${styleTheme}`}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={`${styles.button} ${styleTheme}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
