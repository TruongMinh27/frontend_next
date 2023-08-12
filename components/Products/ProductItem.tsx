import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Button, Card, Col, Badge } from "react-bootstrap";
import { Eye, Pen, Trash, Upload } from "react-bootstrap-icons";
import StarRatingComponent from "react-star-rating-component";
import { useToasts } from "react-toast-notifications";
import { isArray } from "util";
import { getFormatedStringFromDays } from "../../helper/utils";
import { Products } from "../../services/product.service";
import { Rate } from "antd";
import { ProductDetail } from "../../model/index";
import CustomButton from "../Custom/CustomButton";
import formatNumber from "react-format-number-shorten";

interface IProductItemProps {
  userType: string;
  product: ProductDetail;
}

const ProductItem: FC<IProductItemProps> = ({ userType, product }) => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();
  const deleteProduct = async () => {
    try {
      setIsLoading(true);
      const deleteConfirm = confirm(
        "Want to delete? You will lost all details, skus and licences for this product"
      );
      if (deleteConfirm) {
        const deleteProductRes = await Products.deleteProduct(product._id);
        if (!deleteProductRes.success) {
          throw new Error(deleteProductRes.message);
        }
        router.push("/products/");
        addToast(deleteProductRes.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error: any) {
      if (error.response) {
        if (
          isArray(error.response.data?.message) &&
          Array.isArray(error.response?.data?.message)
        ) {
          return error.response.data.message.forEach((message: any) => {
            addToast(message, { appearance: "error", autoDismiss: true });
          });
        } else {
          return addToast(error.response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProductImage = async (e: any) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("productImage", file);
      const uploadProductImageRes = await Products.uploadProductImage(
        product._id,
        formData
      );
      if (!uploadProductImageRes.success) {
        throw new Error(uploadProductImageRes.message);
      }
      product.image = uploadProductImageRes.result;
      addToast(uploadProductImageRes.message, {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error: any) {
      if (error.response) {
        if (
          isArray(error.response.data?.message) &&
          Array.isArray(error.response?.data?.message)
        ) {
          return error.response.data.message.forEach((message: any) => {
            addToast(message, { appearance: "error", autoDismiss: true });
          });
        }
        return addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setUploading(false);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-key
    <>
      <Card className="productCard lg:col-span-3 dark:!bg-black dark:!text-white">
        <div className="p-4">
          <Card.Img
            className="rounded-md border border-gray-300"
            onClick={() => router.push(`/products/${product?._id}`)}
            variant="top"
            src={
              uploading
                ? "https://www.ebi.ac.uk/training/progressbar.gif"
                : product?.image
            }
          />
        </div>
        <Card.Body>
          <Card.Title onClick={() => router.push(`/products/${product?._id}`)}>
            {product.productName}
          </Card.Title>
          <Rate
            className="[&>.ant-rate-star-zero>div>.ant-rate-star-second]:text-gray-500 "
            count={5}
            defaultValue={product.avgRating}
          ></Rate>
          <Card.Text>
            <span className="priceText">
              <span className="priceText !text-primary">
                {product?.skuDetails
                  ? product?.skuDetails?.length > 1
                    ? `${formatNumber(
                        Math.min.apply(
                          Math,
                          product?.skuDetails.map(
                            (sku: { price: number }) => sku.price
                          )
                        )
                      )} VNĐ - ${formatNumber(
                        Math.max.apply(
                          Math,
                          product?.skuDetails.map(
                            (sku: { price: number }) => sku.price
                          )
                        )
                      )} VNĐ`
                    : `${
                        formatNumber(product?.skuDetails?.[0]?.price) +
                          " VNĐ" || "Liên hệ"
                      }`
                  : "Liên hệ"}{" "}
              </span>
            </span>
          </Card.Text>
          {product?.skuDetails &&
            product?.skuDetails?.length > 0 &&
            product?.skuDetails
              .sort(
                (a: { validity: number }, b: { validity: number }) =>
                  a.validity - b.validity
              )
              .map((sku: Record<string, any>, key: any) => (
                <Badge bg="warning" text="dark" className="skuBtn" key={key}>
                  {sku.lifetime
                    ? "Lifetime"
                    : getFormatedStringFromDays(sku.validity)}
                </Badge>
              ))}
          <br />
          {userType === "admin" ? (
            <div className="btnGrpForProduct">
              <div className="file btn btn-md border-black dark:!border-white hover:!bg-primary fileInputDiv ">
                <Upload className="dark:!text-white " />
                <input
                  type="file"
                  name="file"
                  className="fileInput"
                  onChange={uploadProductImage}
                />
              </div>
              <Link href={`/products/update-product?productId=${product?._id}`}>
                <a className="btn border-black dark:!border-white hover:!bg-primary viewProdBtn">
                  <Pen className="dark:!text-white " />
                </a>
              </Link>
              <Button
                variant="outline-dark"
                className="btn border-black dark:!border-white hover:!bg-primary viewProdBtn"
                onClick={() => deleteProduct()}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                <Trash className="dark:!text-white " />
              </Button>
              <Link href={`/products/${product?._id}`}>
                <a className="btn border-black dark:!border-white hover:!bg-primary viewProdBtn">
                  <Eye className="dark:!text-white " />
                </a>
              </Link>
            </div>
          ) : (
            <Link href={`/products/${product?._id}`}>
              <CustomButton className="float-right" type="text" icon={<Eye />}>
                Chi tiết
              </CustomButton>
            </Link>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductItem;
