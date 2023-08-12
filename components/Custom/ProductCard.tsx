import { Rate } from "antd";
type Props = {
  title?: string | undefined;
  price?: string | undefined;
  rate?: number | undefined;
  image?: string | undefined;
};
const ProductCard = ({ price, rate, title, image }: Props) => {
  return (
    <div className="bg-transparent px-5 py-10">
      <button
        onClick={() => "#"}
        className="!bg-white h-96 px-5 lg:my-5 shadow-lg hover:scale-110 hover:shadow-xl dark:!bg-black m-0 lg:w-full rounded-2xl dark:!text-black flex flex-col p-5 dark:border-none border border-gray-300 items-center"
      >
        <img
          src={image}
          className={` h-[230px] m-0 w-full  border border-gray-300 rounded-2xl`}
          alt={image}
        />
        <h3 className="font-display w-full text-sm font-bold mt-4 text-left line-clamp-2 dark:text-white">
          {title}
        </h3>
        <div className="dark:text-white my-1 w-full">{price} VNĐ</div>
        <div className="w-full">
          <Rate
            className="[&>.ant-rate-star-zero>div>.ant-rate-star-second]:text-gray-500 "
            defaultValue={rate}
          />
        </div>
      </button>
    </div>
  );
};

export default ProductCard;
