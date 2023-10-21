import Link from "next/link";
import React, { useEffect } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Table,
} from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { Orders } from "../../services/order.service";
import moment from "moment";
import { Calendar, Clock } from "react-bootstrap-icons";
import formatNumber from "react-format-number-shorten";

const AllOrders = () => {
  const { addToast } = useToasts();
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchItems = async (status?: string) => {
    try {
      const response = await Orders.getAllOrders(status);
      if (!response.success) {
        throw new Error(response.message);
      }
      setOrders(response.result);
    } catch (error: any) {
      if (error.response) {
        if (Array.isArray(error.response?.data?.message)) {
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
    }
  };

  const dateTOLocal = (date: any) => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <Row className="">
        <DropdownButton
          variant="outline-secondary"
          title="Lọc theo trạng thái"
          id="input-group-dropdown-2"
          onSelect={(e) => {
            fetchItems(e ? e : "");
          }}
        >
          <Dropdown.Item href="#" eventKey="">
            - Tất cả -
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="pending">
            Chưa hoàn thành
          </Dropdown.Item>
          <Dropdown.Item href="#" eventKey="completed">
            Hoàn thành
          </Dropdown.Item>
        </DropdownButton>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th> ID</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
            <th>Thành tiền</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order: any) => (
              <tr key={order._id}>
                <Link href={`/orders/${order._id}`}>
                  <td style={{ color: "green", cursor: "pointer" }}>
                    {order.orderId}
                  </td>
                </Link>
                <td>
                  <div className="flex items-center">
                    <Calendar className="mr-2" />

                    {moment(order.createdAt).format("DD-MM-YYYY")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" />
                    {moment(order.createdAt).format("HH:mm")}
                  </div>
                </td>
                <td>
                  <Badge>
                    {order.orderStatus === "completed"
                      ? "HOÀN THÀNH"
                      : "CHƯA HOÀN THÀNH"}
                  </Badge>
                </td>
                <td>{formatNumber(order.paymentInfo?.paymentAmount)}VND </td>
                <td>
                  <Link href={`/orders/${order._id}`}>
                    <Button variant="outline-dark">Xem chi tiết</Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Chưa có đơn hàng</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default AllOrders;
