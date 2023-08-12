import React from "react";
import { Logo } from "../../assets/Icon";
import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:!bg-black">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-5 px-10 lg:px-24 py-8 lg:mx-40 ">
          <div className="lg:col-span-6 col-span-2 text-center lg:text-start ">
            <button
              className="flex items-center justify-center lg:justify-start"
              onClick={() => "/"}
            >
              <Logo height={60} width={90} />
              <span className="text-black font-display text-4xl font-bold dark:!text-white">
                LUVI BEATS
              </span>
            </button>
            <p className="text-gray-400 leading-6 mx-2 text-center lg:text-left">
              Chào mừng bạn đến với trang web chúng tôi - nơi cung cấp các thiết
              bị âm thanh chất lượng cao và bản quyền âm nhạc độc quyền. Chúng
              tôi tự hào là địa chỉ đáng tin cậy cho những người yêu thích âm
              nhạc và đam mê công nghệ âm thanh.
            </p>
            <div className="flex item-center space-x-4 mx-2 my-6 max-sm:flex-wrap justify-center lg:justify-start">
              <GithubFilled className="hover:scale-125 cursor-pointer text-lg dark:!text-white text-black" />
              <FacebookFilled className="hover:scale-125 cursor-pointer text-lg dark:!text-white text-black" />
              <YoutubeFilled className="hover:scale-125 cursor-pointer text-lg dark:!text-white text-black" />
              <InstagramFilled className="hover:scale-125 cursor-pointer text-lg dark:!text-white text-black" />
              <LinkedinFilled className="hover:scale-125 cursor-pointer text-lg dark:!text-white text-black" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-2 lg:col-span-6 text-xs lg:text-lg">
            <div className="col-span-1 p-2">
              <p className="font-display font-semibold text-black dark:!text-white my-4">
                Cửa hàng
              </p>
              <ul>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white leading-6 hover:!text-primary">
                    Tất cả sản phẩm
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    Danh mục
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    Âm nhạc
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-span-1 p-2">
              <p className="font-display font-semibold text-black dark:!text-white my-4">
                Công ty
              </p>
              <ul>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white leading-6 hover:!text-primary">
                    Thông tin công ty
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    FAQ
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    Về chúng tôi
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    Liên hệ
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-span-1 p-2">
              <p className="font-display font-semibold text-black dark:!text-white my-4">
                Tài khoản
              </p>
              <ul>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white leading-6 hover:!text-primary">
                    Thông tin tài khoản
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    Quên mật khẩu
                  </p>
                </li>
                <li>
                  <p className="cursor-pointer text-black dark:!text-white  leading-6 hover:!text-primary">
                    Sửa thông tin tài khoản
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex lg:justify-around pb-4 items-center lg:text-start text-center lg:p-10 lg:mx-40 flex-wrap justify-center">
          <p className="text-black dark:!text-white">
            Copyright © 2023 LUVI BEAST. Powered by{" "}
            <span className="text-primary">Nguyễn Cao Trường Minh</span>
          </p>
          <div className="flex items-center space-x-8">
            <p className="text-black dark:!text-white hover:!text-primary cursor-pointer">
              Các điều khoản và điều kiện
            </p>
            <p className="text-black dark:!text-white hover:!text-primary cursor-pointer">
              Chính sách bảo mật
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
