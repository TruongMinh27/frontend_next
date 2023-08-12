import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CuteDj, Effect } from "../assets/Icon";
import Images from "../assets/Images";
import { CustomButton } from "../components/Custom";
import ProductItem from "../components/Products/ProductItem";
import styles from "../styles/Home.module.css";
import Router from "next/router";

interface Props {
  products: Record<string, any>;
}
const Home: NextPage<Props> = ({ products }) => {
  const { theme } = useTheme();
  const [defaultTheme, setDefaultTheme] = useState<string | undefined>("light");
  useEffect(() => {
    setDefaultTheme(theme);
  }, [theme]);
  return (
    <div className="dark:!bg-jacata">
      <div
        className="pb-14 dark:bg-black mb-8"
        style={
          defaultTheme === "dark"
            ? { backgroundImage: `url(${Images.backgroundGradient_dark})` }
            : { backgroundImage: `url(${Images.backgroundGradient})` }
        }
      >
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-12 h-full ">
          <div className="col-span-6 md:col-span-4 lg:col-span-6 lg:my-40 lg:px-14 lg:ml-20 mt-28 text-center lg:text-left lg:mt-52 flex items-center flex-col ">
            <h1 className="font-display font-bold lg:text-5xl text-base text-center lg:text-left dark:!text-white text-black  capitalize lg:leading-[60px] ">
              thiết bị âm thanh và bản quyền âm nhạc
            </h1>
            <p className="text-black dark:!text-zinc-400 font-semibold my-1 lg:my-6 text-sm lg:text-lg">
              Chúng hân hạnh là nhà cung cấp thiết bị âm thanh chất lượng cao và
              sở hữu bản quyền của nhiều thể loại nhạc thịnh hành trên thị
              trường.
            </p>
            <div className="grid grid-cols-2 lg:col-span-6 gap-4 mt-4 lg:mt-0 md:col-span-4">
              <CustomButton
                onClick={() => ""}
                className="w-32 col-span-2 lg:col-span-1"
                type="primary"
              >
                Mua Ngay
              </CustomButton>
              <CustomButton
                className="w-32 col-span-2 lg:col-span-1"
                type="text"
              >
                Nghe nhạc
              </CustomButton>
            </div>
          </div>
          <div className="col-span-6 md:col-span-6 lg:pr-24 lg:pt-24 relative ">
            <CuteDj className="lg:m-0 lg:mt-5  lg:w-[580px] " />
            <Effect className="absolute top-0 right-5 lg:right-24 lg:mt-24 animate-fly lg:w-[781px]" />
          </div>
        </div>
      </div>
      <div className="mx-4 lg:mx-32 dark:!bg-jacata dark:!text-white">
        <h3 className={`${styles.productCats} dark:!text-white `}>
          Sản phẩm mới
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 ">
          {products.latestProducts &&
            products.latestProducts.map(
              (product: any, index: React.Key | null | undefined) => {
                return (
                  <ProductItem
                    product={product}
                    userType={"customer"}
                    key={index}
                  />
                );
              }
            )}
        </div>
        {products.topRatedProducts ? (
          <h3 className={`${styles.productCats} dark:!text-white`}>
            Top Đánh Giá
          </h3>
        ) : (
          <></>
        )}
        <div className="dark:!bg-jacata grid grid-cols-1 gap-4 lg:grid-cols-12">
          {products.topRatedProducts &&
            products.topRatedProducts?.map(
              (product: any, index: React.Key | null | undefined) => {
                return (
                  <ProductItem
                    product={product}
                    userType={"customer"}
                    key={index}
                  />
                );
              }
            )}
        </div>
        <Row>
          <Col className="justify-center flex p-5">
            <CustomButton
              onClick={() => Router.push("/products")}
              type="primary"
            >
              Xem Thêm
            </CustomButton>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${
        process.env.NODE_ENV !== "production"
          ? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
          : process.env.NEXT_PUBLIC_BASE_API_URL
      }/products?homepage=true`
    );
    return {
      props: {
        products: data?.result[0] || {},
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Home;
