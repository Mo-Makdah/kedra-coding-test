import { IconProps } from "@/types/icon";

const BackArrowIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      height={height || "1.4rem"}
      width={width || "1.4rem"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
    </svg>
  );
};

export default BackArrowIcon;
