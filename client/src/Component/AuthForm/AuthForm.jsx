import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import { Button } from "../../Component";
import { FcGoogle } from "react-icons/fc";
const AuthForm = ({
  linkTo,
  linkText,
  title,
  img,
  btnText,
  children,
  handleSubmit,
}) => {
  const bodyAuthForm = useRef();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/register") {
      setTimeout(() => {
        bodyAuthForm.current.classList.add("reverse");
      }, 100);
    } else if (location.pathname === "/login") {
      bodyAuthForm.current.classList.add("reverse");
      setTimeout(() => {
        bodyAuthForm.current.classList.remove("reverse");
      }, 100);
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-screen flex items-center justify-center gradien">
      <div className="bg-white rounded-2xl shadow-2xl p-1 w-full max-w-[1000px] mx-6">
        <div
          className="flex w-full h-full bg-primaryColor rounded-2xl"
          ref={bodyAuthForm}
        >
          <div className="left w-[60%] flex z-10 flex-col gap-8 justify-between transition-all ease-linear duration-[400ms]">
            <p className="text-2xl text-white mt-16 ml-8 z-10">
              "Sắp xếp thời gian và
              <br />
              quản lý công việc của bạn"
            </p>
            <figure className="w-full mb-5">
              <img
                src={img}
                className="w-full object-cover"
                alt="Hình minh họa"
              />
            </figure>
          </div>
          <div className="right bg-white w-full flex flex-col items-center py-10 justify-center transition-all ease-linear duration-[400ms]">
            <div className="w-[60%]">
              <h2 className="font-extrabold text-center text-3xl mb-8">
                {title}
              </h2>
              <div>
                <form onSubmit={handleSubmit}>{children}</form>
                <div className="mt-8">
                  <Button
                    large
                    primary
                    className="w-full"
                    onClick={handleSubmit}
                  >
                    {btnText}
                  </Button>
                </div>
                <p className="text-center my-5">- Hoặc -</p>
                <div className="flex justify-center">
                  <Button
                    lefIcon={<FcGoogle />}
                    outline
                    small
                    className="flex items-center gap-2 rounded-lg py-3 hover:opacity-80"
                  >
                    Đăng nhập với google
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-base">
                  <p>
                    Bạn {location.pathname === "/login" ? "chưa" : "đã"} có tài
                    khoản?
                  </p>
                  <Link
                    to={linkTo}
                    className="text-primaryColor font-medium hover:underline"
                  >
                    {linkText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  children: PropTypes.node,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
  btnText: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default AuthForm;
