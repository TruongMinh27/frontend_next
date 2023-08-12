import React from "react";
import { Button } from "react-bootstrap";
import { Card, Col, Form, Row } from "react-bootstrap";
import RegisterLogin from "../components/Auth/RegisterLogin";

const Auth = () => {
  return (
    <div className="max-sm:mx-3 lg:mx-32 my-32">
      <Row>
        <Col sm={6} className="mt-3">
          <RegisterLogin />
        </Col>
        <Col sm={6} className="mt-3">
          <RegisterLogin isResgisterForm={true} />
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
