import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Context } from "../context";

const OrderSuccess = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);
  const { cartDispatch } = useContext(Context);
  useEffect(() => {
    // if (!user || !user.email) {
    // 	router.push('/');
    // }
    cartDispatch({ type: "CLEAR_CART", payload: {} });
  }, [router, user, cartDispatch]);

  return (
    <Row className="m-0">
      <Col md={{ span: 6, offset: 3 }}>
        <div className="jumbotron text-center mt-32">
          <h1 className="display-3">Cảm ơn đã mua hàng!</h1>
          <p className="lead">
            <strong>Vui lòng kiểm tra chi tiết đơn hàng</strong>
          </p>
          <hr />
          <p className="lead">
            <Link href={`/products`}>
              <a className="btn btn-primary btn-sm" role="button">
                Mua thêm
              </a>
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default OrderSuccess;
