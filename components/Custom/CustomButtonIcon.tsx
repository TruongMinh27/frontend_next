import { Button, Popover } from "antd";
import { ButtonType } from "antd/es/button";
type Props = {
  className?: string | undefined;
  onClick?: () => void;
  // cho Carousel
  next?: React.MouseEventHandler<any> | undefined;
  type?: ButtonType;
  icon?: React.ReactNode;
  iconLight?: JSX.Element;
  iconDark?: JSX.Element;
  hoverContent?: React.ReactNode;
  theme?: string;
};
const CustomButtonIcon = ({
  className,
  icon,
  onClick,
  type,
  iconLight,
  iconDark,
  hoverContent,
  theme,
}: Props) => {
  return (
    <Popover
      arrow={false}
      color={theme === "light" ? "#000" : "#3b3b3b"}
      content={hoverContent}
      className="[&>.ant-popover-content>.ant-popover-inner]:!bg-red-500"
    >
      <Button
        className={`rounded-full before:!content-none z-10 text-black dark:!text-white !w-10 h-10 bg-white !flex !items-center !justify-center dark:!bg-[#ffffff26] hover:!bg-[#3ec2d4] dark:hover:!bg-[#3ec2d4] hover:!text-white ${className}`}
        onClick={onClick}
        type={type}
        icon={(theme === "dark" ? iconLight : iconDark) || icon}
      />
    </Popover>
  );
};

export default CustomButtonIcon;
