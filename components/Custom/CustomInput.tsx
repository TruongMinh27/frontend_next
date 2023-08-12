import { Input, InputProps } from "antd";
interface CustomProps extends InputProps {}
const CustomInput = (props: CustomProps) => {
  return (
    <Input
      {...props}
      className={`dark:bg-[#ffffff26] dark:text-white rounded-2xl py-3 [&>.ant-input]:!bg-transparent dark:[&>.ant-input]:!text-white dark:!placeholder-gray-400 dark:[&>.ant-input]:!placeholder-gray-400 ${props.className}`}
    />
  );
};

export default CustomInput;
