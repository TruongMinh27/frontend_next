import {
  BulbFilled,
  BulbOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import { NextPage } from "next";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Logo } from "../../assets/Icon";
import { Context } from "../../context";
import { Users } from "../../services/user.service";
import { CustomButtonIcon, CustomInput } from "../Custom";
interface ProductProps {
  product: Record<string, any>;
}

const TopHead = () => {
  const [show, setShow] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  // ***** **** Test
  // const [displaySku, setDisplaySku] = React.useState(
  //   product?.skuDetails
  //     ? product?.skuDetails.sort(
  //         (a: { price: number }, b: { price: number }) => a.price - b.price
  //       )[0] || {}
  //     : {}
  // );

  const [baseType, setBaseType] = React.useState("Applications");

  const {
    state: { user },
    dispatch,
    cartItems,
    cartDispatch,
  } = useContext(Context);
  const router = useRouter();

  const isLogined = user?.id;

  const search = () => {
    router.push(`/products?search=${searchText}`);
  };

  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { addToast } = useToasts();
  const [quantity, setQuantity] = useState(1);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleOpenDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // const handleShow = () => setShow(true);
  // const handleCart = () => {
  //   cartDispatch({
  //     type: cartItems.find(
  //       (item: { skuId: string }) => item.skuId === displaySku._id
  //     )
  //       ? "UPDATE_CART"
  //       : "ADD_TO_CART",
  //     payload: {
  //       skuId: displaySku._id,
  //       quantity: quantity,
  //       validity: displaySku.lifetime ? 0 : displaySku.validity,
  //       lifetime: displaySku.lifetime,
  //       price: displaySku.price,
  //       productName: product.productName,
  //       productImage: product.image,
  //       productId: product._id,
  //       skuPriceId: displaySku.stripePriceId,
  //     },
  //   });
  //   setShow(true);
  // };

  const logoutHandler = async () => {
    try {
      dispatch({
        type: "LOGOUT",
        payload: undefined,
      });
      await Users.logoutUser();
      localStorage.removeItem("_digi_user");
      addToast("Logout Successful", {
        appearance: "success",
        autoDismiss: true,
      });
      router.push("/auth");
    } catch (error: any) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // fake login

  const contentAccountLogined = (
    <div className="text-black dark:!text-white !bg-white dark:!bg-[#3b3b3b] px-3 rounded-md w-40 !text-left">
      <p className="border-b-2 font-display font-semibold py-2 m-0">
        {user?.name} | {user?.type === "admin" ? user.type : ""}
      </p>
      <ul className="m-0">
        <li className=" py-1 hover:!text-primary">
          <button onClick={() => router.push("/my-account")}>
            Thông tin tài khoản
          </button>
        </li>
        <li className=" py-1 hover:!text-primary">
          <button onClick={() => "/"}>Đổi mật khẩu</button>
        </li>
      </ul>
      <button
        onClick={logoutHandler}
        className="text-center border-t-2 w-full text-red-500 hover:!text-gray-500 py-2"
      >
        Đăng xuất
      </button>
    </div>
  );

  const contentAccounUnlogined = (
    <div className="text-black dark:!text-white !bg-white dark:!bg-[#3b3b3b] px-3 rounded-md w-40 !text-left">
      <p className="border-b-2 font-display font-semibold py-2 m-0">
        Tài khoản
      </p>
      <ul>
        <li className="py-1">
          <button
            onClick={() => router.push("/auth")}
            className=" hover:!text-primary"
          >
            Đăng nhập
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => router.push("/auth")}
            className="hover:!text-primary"
          >
            Đăng ký
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    // <>
    // 	<Row className='mt-3'>
    // 		<Col xs={6} md={4}>
    // 			<h3 className={styles.logoHeading} onClick={() => router.push('/')}>
    // 				Digizone
    // 			</h3>
    // 		</Col>
    // 		<Col xs={6} md={4}>
    // 			{' '}
    // 			<InputGroup>
    // 				<InputGroup.Text id='inputGroup-sizing-default'>
    // 					<Search />
    // 				</InputGroup.Text>
    // 				<Form.Control
    // 					aria-label='Default'
    // 					aria-describedby='inputGroup-sizing-default'
    // 					placeholder='Search the product here...'
    // 					value={searchText}
    // 					onChange={(e) => setSearchText(e.target.value)}
    // 					onKeyPress={(e) => e.key === 'Enter' && search()}
    // 				/>
    // 				<Button
    // 					variant='outline-success'
    // 					id='button-addon2'
    // 					onClick={() => search()}
    // 				>
    // 					Search
    // 				</Button>
    // 			</InputGroup>
    // 		</Col>
    // 		<Col xs={6} md={4}>
    // 			{/* <CartFill
    // 				height='40'
    // 				width='40'
    // 				color='#4c575f'
    // 				className={styles.personIcon}
    // 			/> */}
    // 			<PersonCircle
    // 				height='40'
    // 				width='40'
    // 				color='#4c575f'
    // 				className={styles.personIcon}
    // 				onClick={() => {
    // 					if (user && user.email) {
    // 						router.push('/my-account');
    // 					} else {
    // 						router.push('/auth');
    // 					}
    // 				}}
    // 			/>
    // 		</Col>
    // 	</Row>
    // 	<Navbar
    // 		collapseOnSelect
    // 		expand='lg'
    // 		bg='light'
    // 		variant='light'
    // 		color='#4c575f'
    // 	>
    // 		<Navbar.Toggle aria-controls='responsive-navbar-nav' />
    // 		<Navbar.Collapse id='responsive-navbar-nav'>
    // 			<Nav className='me-auto'>
    // 				<Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
    // 				<NavDropdown
    // 					title={baseType}
    // 					id='collasible-nav-dropdown'
    // 					onSelect={(e) => {
    // 						setBaseType(e as string);
    // 						e === 'Applications'
    // 							? router.push('/products')
    // 							: router.push(`/products?baseType=${e}`);
    // 					}}
    // 				>
    // 					<NavDropdown.Item eventKey='Computer' onClick={() => {}}>
    // 						Computer
    // 					</NavDropdown.Item>
    // 					<NavDropdown.Item eventKey='Mobile'>Mobile</NavDropdown.Item>
    // 					<NavDropdown.Item eventKey='Applications'>All</NavDropdown.Item>
    // 				</NavDropdown>
    // 			</Nav>
    // 			<Nav>
    // 				<Nav.Link
    // 					className={styles.cartItems}
    // 					onClick={() => setShow(true)}
    // 				>
    // 					Items: <Badge bg='secondary'>{cartItems.length}</Badge> (₹
    // 					{cartItems
    // 						.map(
    // 							(item: { quantity: number; price: number }) =>
    // 								Number(item.price) * Number(item.quantity)
    // 						)
    // 						.reduce((a: number, b: number) => a + b, 0)}
    // 					)
    // 				</Nav.Link>
    // 				{/* <Nav.Link href='#deets'>Checkout</Nav.Link> */}
    // 				<Nav.Link eventKey={2} href='#memes'>
    // 					{/* Contact Us */}
    // 				</Nav.Link>
    // 			</Nav>
    // 		</Navbar.Collapse>
    // 	</Navbar>
    // 	<CartOffCanvas setShow={setShow} show={show} />
    // </>
    <>
      <header className="xl:px-24 px-6 py-6 max-sm:px-2 !text-black dark:!text-white space-x-6 backdrop-blur fixed z-10 top-0 left-0 right-0 flex justify-between items-center">
        <div className="flex justify-around items-center  ">
          <button
            className="flex justify-around items-center"
            onClick={() => router.push("/")}
          >
            <Logo height={60} width={90} />
            <span className="!text-black font-display text-4xl font-bold dark:!text-white whitespace-nowrap max-sm:text-2xl">
              LUVI BEATS
            </span>
          </button>
          <div className="ml-5 sm:hidden max-md:hidden md:hidden lg:flex ">
            <CustomInput
              size="large"
              className="!py-2 px-4 "
              onPressEnter={search}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={
                <SearchOutlined
                  onClick={search}
                  className="!text-black dark:!text-white hover:!text-blue"
                />
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center space-x-2 !text-black dark:!text-white">
          <div className="flex justify-around item-center space-x-10  max-md:hidden md:hidden lg:flex">
            <button
              onClick={() => "/cua-hang"}
              className=" whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Cửa hàng
            </button>
            <button
              onClick={() => "/danh-muc"}
              className=" whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Danh mục
            </button>
            <button
              onClick={() => "/beat"}
              className=" whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Beat
            </button>
            <button
              onClick={() => "/tin-tuc"}
              className=" whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Tin tức
            </button>
            <div className=" whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"></div>
          </div>
          <div className="items-center space-x-2 max-md:hidden md:hidden lg:flex">
            {/* <CustomButtonIcon
              onClick={handleCart}
              iconDark={
                <ShoppingOutlined className="!text-[22px] hover:!text-white" />
              }
              iconLight={
                <ShoppingOutlined className="!text-[22px] text-white" />
              }
            /> */}
            <CustomButtonIcon
              onClick={() => console.log("nothing")}
              iconDark={
                <UserOutlined className="!text-[22px] hover:!text-white" />
              }
              iconLight={<UserOutlined className="!text-[22px] text-white" />}
              hoverContent={
                isLogined ? contentAccountLogined : contentAccounUnlogined
              }
            />
            <CustomButtonIcon
              onClick={handleTheme}
              iconDark={
                <BulbFilled className="!text-[22px] hover:!text-white" />
              }
              iconLight={<BulbOutlined className="!text-[22px] text-white" />}
            />
          </div>
          {/* Mobile Nav */}
          <div className="max-md:!flex md:flex lg:hidden hidden space-x-2">
            <CustomButtonIcon
              onClick={handleTheme}
              iconDark={
                <BulbFilled className="!text-[22px] hover:!text-white" />
              }
              iconLight={<BulbOutlined className="!text-[22px] text-white" />}
            />
            <CustomButtonIcon
              onClick={handleOpenDrawer}
              iconDark={
                <MenuOutlined className="!text-[22px] hover:!text-white" />
              }
              iconLight={<MenuOutlined className="!text-[22px] text-white" />}
            />
          </div>
        </div>
      </header>
      {/* Mobile SubNav */}
      <Drawer
        className=" dark:[&>.ant-drawer-wrapper-body>.ant-drawer-header>.ant-drawer-header-title>.ant-drawer-close]:!text-white dark:[&>.ant-drawer-wrapper-body>.ant-drawer-header>.ant-drawer-header-title>.ant-drawer-title]:!text-white dark:!bg-black font-display"
        title=""
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <CustomInput
            enterKeyHint="search"
            onSubmit={() => console.log("working")}
            size="large"
            className="!py-2 px-4 bordered border-black "
            prefix={<SearchOutlined className="!text-black dark:!text-white" />}
          />
        }
      >
        <ul>
          <li className="text-center">
            <button
              onClick={() => "/cua-hang"}
              className="text-black text-center w-full dark:text-white whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Cửa hàng
            </button>
          </li>
          <li className="text-center">
            <button
              onClick={() => "/danh-muc"}
              className="text-black text-center w-full dark:text-white whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Danh mục
            </button>
          </li>
          <li className="text-center">
            <button
              onClick={() => "/beat"}
              className="text-black text-center w-full dark:text-white whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Beat
            </button>
          </li>
          <li className="text-center">
            <button
              onClick={() => "/tin-tuc"}
              className="text-black text-center w-full dark:text-white whitespace-nowrap font-display font-bold text-lg hover:!text-primary cursor-pointer"
            >
              Tin tức
            </button>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default TopHead;
