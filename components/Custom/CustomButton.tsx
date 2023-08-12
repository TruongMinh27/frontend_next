import { Button } from "antd";
import { BaseButtonProps, ButtonProps } from "antd/es/button/button";

interface ButtonCustomProps extends ButtonProps {}
interface BaseButtonCustomProps extends BaseButtonProps {}

const CustomButton = (
  buttonProps: ButtonCustomProps,
  baseProps: BaseButtonCustomProps
) => {
  return (
    <Button
      {...baseProps}
      {...buttonProps}
      className={`bg-accent border-none shadow-accent-volume shadow-xl flex justify-center items-center px-5 h-10 rounded-2xl text-black dark:text-white mx-1 ${
        buttonProps.className
      } ${
        buttonProps.type === "text"
          ? "!bg-white border-none hover:!bg-primary shadow-accent-volume-white  !text-black hover:!text-white"
          : ""
      }`}
    />
  );
};

export default CustomButton;
