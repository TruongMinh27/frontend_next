import React, { FC, useContext, useEffect, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Users } from "../../services/user.service";
import { useToasts } from "react-toast-notifications";
import { resposnePayload } from "../../services/api";
import validator from "validator";
import Router from "next/router";
import { Context } from "../../context";
import { CustomButton } from "../Custom";
interface IRegisterLoginProps {
  isResgisterForm?: boolean;
}

const initalForm = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

const RegisterLogin: FC<IRegisterLoginProps> = ({
  isResgisterForm = false,
}) => {
  const { addToast } = useToasts();
  const [authForm, setAuthForm] = React.useState(initalForm);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingForgotPwd, setIsLoadingForgotPwd] = React.useState(false);
  const [otpTime, setOtpTime] = React.useState(false);
  const [otpForm, setOtpForm] = React.useState({ email: "", otp: "" });

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user && user.email) {
      Router.push("/my-account"); // if user already logged in redirect to my account
    }
  }, [user]);

  // handle register form
  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const { email, name, password, confirmPassword } = authForm;
      if (!name) {
        throw new Error("Tên không hợp lệ");
      }
      if (!validator.isEmail(email)) {
        throw new Error("Email không hợp lệ");
      }
      if (password !== confirmPassword) {
        console.error("Mật khẩu không hợp lệ", password, confirmPassword);
        throw new Error("Nhập lại mật khẩu không đúng");
      }
      if (password.length < 6) {
        throw new Error("Mật không quá ngắn vui lòng nhập tối thiểu 6 ký tự");
      }
      setIsLoading(true);
      const payload = {
        email: authForm.email,
        password: authForm.password,
        name: authForm.name,
      };

      const { success, message }: resposnePayload = await Users.registerNewUser(
        payload
      );
      if (!success) throw new Error(message);
      setOtpForm({ ...otpForm, email: email });
      setOtpTime(true);
      addToast(message, { appearance: "success", autoDismiss: true });
    } catch (error: any) {
      if (error.response) {
        return addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };

  // handle login form
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { email, password } = authForm;
      if (!email || !password) {
        throw new Error("Sai email hoặc mật khẩu");
      }
      if (!validator.isEmail(email)) {
        throw new Error("Sai email");
      }
      if (password.length < 6) {
        throw new Error("Mật khẩu quá ngắn");
      }
      setIsLoading(true);
      const payload = {
        email,
        password,
      };
      const { success, message, result }: resposnePayload =
        await Users.loginUser(payload);
      if (!success) throw new Error(message);

      dispatch({
        type: "LOGIN",
        payload: result?.user,
      });
      addToast(message, { appearance: "success", autoDismiss: true });
      // redirect to home page
      Router.push("/");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        return addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };

  // handle resend otp
  const otpResend = async () => {
    try {
      const { email } = otpForm;
      if (!validator.isEmail(email)) {
        throw new Error("Sai email");
      }
      setIsLoading(true);
      const { success, message }: resposnePayload = await Users.resendOTP(
        email
      );
      if (!success) throw new Error(message);
      addToast(message, { appearance: "success", autoDismiss: true });
    } catch (error: any) {
      if (error.response) {
        return addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };

  // verify user otp
  const verifyUser = async (e: any) => {
    e.preventDefault();
    try {
      if (!validator.isEmail(otpForm.email)) {
        throw new Error("Sai email");
      }
      setIsLoading(true);
      const { success, message }: resposnePayload = await Users.verifyOTP(
        otpForm.otp,
        otpForm.email
      );
      if (!success) throw new Error(message);
      addToast(message, { appearance: "success", autoDismiss: true });
      setOtpTime(false);
      setAuthForm(initalForm);
    } catch (error: any) {
      if (error.response) {
        return addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      const { email } = authForm;
      if (!validator.isEmail(email)) {
        throw new Error("Sai email. Vui lòng nhập địa chỉ email !");
      }
      setIsLoadingForgotPwd(true);
      const { success, message }: resposnePayload =
        await Users.forgotUserPassword(email);
      if (!success) throw new Error(message);
      addToast(message, { appearance: "success", autoDismiss: true });
    } catch (error: any) {
      if (error.response) {
        return addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoadingForgotPwd(false);
    }
  };

  return (
    <Card className="dark:!bg-black dark:text-white">
      <Card.Header>{isResgisterForm ? "Đăng ký" : "Đăng nhập"}</Card.Header>
      <Card.Body>
        <Form>
          {isResgisterForm && (
            <Form.Group className="mb-3">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nhập tên tài khoản"
                disabled={otpTime}
                value={authForm.name || ""}
                onChange={(e) =>
                  setAuthForm({ ...authForm, name: e.target.value })
                }
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              disabled={otpTime}
              value={authForm.email || ""}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Nhập Mật khẩu ..."
              disabled={otpTime}
              value={authForm.password || ""}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />
          </Form.Group>
          {isResgisterForm && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="repassword"
                  placeholder="Nhập lại mật khẩu ..."
                  disabled={otpTime}
                  value={authForm.confirmPassword || ""}
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </Form.Group>
              {otpTime && (
                <Form.Group className="mb-3">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    onChange={(e) =>
                      setOtpForm({ ...otpForm, otp: e.target.value })
                    }
                  />

                  <Button
                    variant="link"
                    className="resendOtpBtn"
                    onClick={otpResend}
                  >
                    Gửi lại OTP
                  </Button>
                </Form.Group>
              )}
            </>
          )}
          {otpTime ? (
            <Form.Group className="mb-3">
              <Button
                variant="info"
                type="submit"
                className="btnAuth"
                disabled={isLoading}
                onClick={verifyUser}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Gửi
              </Button>
            </Form.Group>
          ) : (
            <Form.Group className="mb-3">
              <CustomButton
                type="default"
                className="!bg-primary w-full text-white hover:!opacity-80"
                disabled={isLoading}
                onClick={isResgisterForm ? handleRegister : handleLogin}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm mr-2 "
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {isResgisterForm ? "Đăng ký" : "Đăng nhập"}
              </CustomButton>
            </Form.Group>
          )}
        </Form>
        {!isResgisterForm && (
          <a
            style={{ textDecoration: "none" }}
            href=""
            onClick={forgotPassword}
          >
            {isLoadingForgotPwd && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Quên mật khẩu ?
          </a>
        )}
      </Card.Body>
    </Card>
  );
};

export default RegisterLogin;
