import axios from "axios";
import moment from "moment";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import formatNumber from "react-format-number-shorten";
import { useToasts } from "react-toast-notifications";

interface OrderProps {
  order: any;
}

const Order: NextPage<OrderProps> = ({ order }) => {
  const { addToast } = useToasts();
  return (
    <>
      <Row>
        <Col>
          <Card style={{ marginTop: "110px" }}>
            <Card.Header> Chi Tiết Đơn hàng</Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th>Key bản quyền</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderedItems.map((item: any) => (
                    <tr key={item.skuCode}>
                      <td>
                        {" "}
                        <div className="itemTitle">
                          <Image
                            height={50}
                            width={50}
                            roundedCircle={true}
                            src={
                              item.productImage ||
                              "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                            }
                            alt=""
                          />
                          <p style={{ marginLeft: "5px" }}>
                            <Link href={`/products/${item.productId}`}>
                              <a style={{ textDecoration: "none" }}>
                                {item.productName || "Demo Product"}
                              </a>
                            </Link>
                            <p style={{ fontWeight: "bold" }}>
                              {item.quantity} X {formatNumber(item.price)}VND
                            </p>
                          </p>
                        </div>
                        {/* <Link href={''}>
													<Button variant='link'>
														Issue with this product? Then Contact US...
													</Button>
												</Link> */}
                      </td>
                      <td>
                        {item.licenses.map((key: any, index: any) => {
                          return (
                            <div className="" key={index + key}>
                              <span>{key}</span>
                              <Button
                                key={index + key}
                                variant="light"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(key);
                                  addToast("Đã coppy", {
                                    appearance: "success",
                                    autoDismiss: true,
                                  });
                                }}
                              >
                                <Clipboard />
                              </Button>
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header>
              <Card.Title>
                Tổng cộng : {order.paymentInfo?.paymentAmount} VND
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Ngày thanh toán :{" "}
                  {moment(order.paymentInfo?.paymentDate).format("DD-MM-YYYY")}
                  {"  "}
                  Giờ : {moment(order.paymentInfo?.paymentDate).format("HH:mm")}
                </ListGroup.Item>
                <ListGroup.Item>
                  Phương thức thanh toán:{" "}
                  {order.paymentInfo?.paymentMethod.toUpperCase()}
                </ListGroup.Item>
                <ListGroup.Item>
                  Trạng thái:{" "}
                  <Badge>
                    {order.orderStatus === "completed"
                      ? "HOÀN THÀNH"
                      : "CHƯA HOÀN THÀNH"}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  Địa chỉ 1 : {order.customerAddress.line1}
                  <br />
                  Địa chỉ 2 : {order.customerAddress.line2}
                  <br />
                  Thành phố : {order.customerAddress.city}
                  <br />
                  Tỉnh: {order.customerAddress.state}
                  <br />
                  Quốc gia : {order.customerAddress.country}
                  <br />
                  Postal Code : {order.customerAddress.postal_code}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<OrderProps> = async (
  context
): Promise<any> => {
  try {
    if (!context.params?.id) {
      return {
        props: {
          order: {},
        },
      };
    }
    const { data } = await axios.get(
      `${
        process.env.NODE_ENV !== "production"
          ? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
          : process.env.NEXT_PUBLIC_BASE_API_URL
      }/orders/${context?.params?.id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: context?.req?.headers?.cookie as string,
        },
      }
    );
    if (!data.success) {
      return {
        props: {
          order: {},
        },
      };
    }
    return {
      props: {
        order: data?.result || ({} as Record<string, any>),
      },
    };
  } catch (error) {
    return {
      props: {
        order: {},
      },
    };
  }
};

export default Order;
