import { IconProps } from "@/types/icon";

const OptionsIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      width={width || "1rem"}
      height={height || "1rem"}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
};

export default OptionsIcon;
