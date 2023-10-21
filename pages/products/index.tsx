import styles from "../../styles/Product.module.css";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import queryString from "query-string";

import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import BreadcrumbDisplay from "../../components/shared/BreadcrumbDisplay";
import PaginationDisplay from "../../components/shared/PaginationDisplay";
import { PlusCircle } from "react-bootstrap-icons";
import { useContext, useEffect } from "react";
import { useState } from "react";
import ProductItem from "../../components/Products/ProductItem";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import { Context } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";
import ProductFilter from "../../components/Products/ProductFilter";
import { ProductDetail } from "../../model";
import CustomButton from "../../components/Custom/CustomButton";
import { useTheme } from "next-themes";

interface Props {
  products: ProductDetail[];
  metadata: Record<string, any>;
}

const AllProducts: NextPage<Props> = ({ products, metadata }) => {
  const { addToast } = useToasts();
  const { theme } = useTheme();
  const [userType, setUserType] = useState("customer");
  const [sortText, setSortText] = useState("Sắp xếp");
  const router = useRouter();

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user && user.email) {
      setUserType(user.type);
    }
  }, [user]);

  return (
    <div className="px-10 mt-28 dark:!bg-jacata">
      <Row>
        <Col md={8}>
          <BreadcrumbDisplay
            childrens={[
              {
                active: false,
                href: "/",
                text: "Home",
              },
              {
                active: true,
                href: "",
                text: "Products",
              },
            ]}
          />
        </Col>
        <Col
          md={4}
          className=" flex flex-row-reverse  justify-start items-center"
        >
          <DropdownButton
            variant={theme === "dark" ? "outline-light" : "outline-secondary"}
            title={sortText}
            id="input-group-dropdown-2"
            className={`${styles.dropdownBtn} !text-white ml-3`}
            onSelect={(e) => {
              if (e) {
                setSortText(
                  e === "-avgRating"
                    ? "Lượt Thích"
                    : e === "-createdAt"
                    ? "Mới nhất"
                    : "Sort By"
                );
                delete router.query.offset;
                router.query.sort = e;
                router.push(router);
              } else {
                delete router.query.sort;
                router.push(router);
              }
            }}
          >
            <Dropdown.Item href="#" eventKey="-avgRating">
              Lượt thích
            </Dropdown.Item>
            <Dropdown.Item href="#" eventKey="-createdAt">
              Mới nhất
            </Dropdown.Item>
            <Dropdown.Item href="#" eventKey="">
              Bỏ xếp
            </Dropdown.Item>
          </DropdownButton>
          {userType === "admin" && (
            <Link href="/products/update-product">
              <CustomButton type="primary" icon={<PlusCircle />}>
                Thêm
              </CustomButton>
            </Link>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={2} className="mt-2">
          <ProductFilter />
        </Col>
        <Col sm={10}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductItem
                  key={product._id as string}
                  userType={userType}
                  product={product}
                />
              ))
            ) : (
              <h1 className="col-span-6">Không có sản phẩm</h1>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <PaginationDisplay metadata={metadata} />
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
): Promise<any> => {
  try {
    // get products with axios
    const url = queryString.stringifyUrl({
      url: `${
        process.env.NODE_ENV !== "production"
          ? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
          : process.env.NEXT_PUBLIC_BASE_API_URL
      }/products`,
      query: context.query,
    });
    const { data } = await axios.get(url);
    return {
      props: {
        products: data?.result?.products || ([] as Record<string, any>[]),
        metadata: data?.result?.metadata || {},
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default AllProducts;
