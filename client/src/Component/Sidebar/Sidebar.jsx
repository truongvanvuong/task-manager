import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { Context } from "../../App.jsx";
import { AiFillHome, AiFillProfile, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiFileList2Fill } from "react-icons/ri";
import { BsClipboard2CheckFill, BsArrowLeft } from "react-icons/bs";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch, Popover } from "antd";
import Tippy from "@tippyjs/react";
const navs = [
  {
    icon: <AiFillHome />,
    display: "Trang Chủ",
    path: "/home",
  },
  {
    icon: <AiFillProfile />,
    display: "Quan trọng",
    path: "/important",
  },
  {
    icon: <BsClipboard2CheckFill />,
    display: "Hoàn thành",
    path: "/completed",
  },
  {
    icon: <RiFileList2Fill />,
    display: "Chưa hoàn thành",
    path: "/incompleted",
  },
];
const Sidebar = ({ setIsModalOpen }) => {
  const { isDarkMode, setIsDarkMode } = useContext(Context);
  const [collapse, setCollapse] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const handleChange = (checked) => {
    setIsDarkMode(checked);
  };
  const showModal = () => {
    setOpenPopover(false);
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSideBar = () => {
    setTimeout(() => {
      setCollapse((prev) => !prev);
    }, 100);
  };
  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };
  const contentPopover = (
    <div className="px-4 py-3">
      <div className="flex items-center gap-4 pb-6 border-b border-defaultBorder dark:border-defaultBorderDark">
        <figure className="w-[46px] h-[46px] rounded-full border border-solid border-defaultBorder flex items-center justify-center overflow-hidden cursor-pointer">
          <img
            className="w-full h-full rounded-full object-cover"
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
          />
        </figure>
        <div>
          <h2 className="font-medium dark:text-textDark text-[1rem]">
            Truong Van Vuong
          </h2>
          <h3 className="font-normal dark:text-textDark text-secondaryText text-[0.9rem]">
            VanVuong
          </h3>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-start text-textColor dark:text-textDark gap-3 text-[0.9rem]">
        <span
          className="hover:opacity-80 hover:text-textColor dark:hover:text-current cursor-pointer"
          onClick={showModal}
        >
          Thiết lập tài khoản
        </span>
        <span className="hover:opacity-80 cursor-pointer">Đăng xuất</span>
      </div>
    </div>
  );
  return (
    <aside className="border border-defaultBorder dark:border-defaultBorderDark dark:bg-gray rounded-xl shadow-lg">
      <div
        className={`my-4 h-[calc(100%-2rem)] flex flex-col justify-between w-[220px] transition-all duration-500 ${
          collapse && "sideBar-collapse"
        }`}
      >
        <div className="flex gap-4 px-6 items-center relative">
          <Popover
            open={openPopover}
            placement="topLeft"
            trigger="click"
            content={contentPopover}
            arrow={false}
            onOpenChange={handleOpenChange}
          >
            <figure className="w-[46px] h-[46px] rounded-full border border-solid transition-all duration-500 border-defaultBorder flex items-center justify-center overflow-hidden cursor-pointer">
              <img
                className="w-full h-full rounded-full object-cover"
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
              />
            </figure>
          </Popover>
          <h2 className="text-[1rem] dark:text-textDark font-medium name">
            VanVuong
          </h2>
          <Tippy
            placement="right"
            content={collapse ? "Mở rộng" : "Thu gọn"}
            theme={isDarkMode ? "dark" : "light"}
          >
            <div
              className="absolute w-8 h-8 border-defaultBorder border rounded-md flex items-center justify-center -right-0 translate-x-1/2 bg-white shadow-xl cursor-pointer dark:bg-gray dark:border-defaultBorderDark"
              onClick={handleSideBar}
            >
              {collapse ? (
                <AiOutlineMenuUnfold className="text-[1.2rem] text-textColor dark:text-textDark" />
              ) : (
                <BsArrowLeft className="text-[1.2rem] text-textColor dark:text-textDark" />
              )}
            </div>
          </Tippy>
        </div>
        <div>
          <ul>
            {navs.map((item, index) => {
              return (
                <li key={index}>
                  <Tippy
                    onShow={() => (collapse ? true : false)}
                    placement="right"
                    content={item.display}
                    theme={isDarkMode ? "dark" : "light"}
                  >
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "bg-separator dark:bg-defaultBorderDark flex items-center gap-3 px-6 py-2 border-r-4 border-primaryColor transition-all duration-[400ms]"
                          : "hover:bg-layoutBackground dark:hover:bg-separatorDark flex items-center gap-3 px-6 py-2 border-r-4 border-transparent"
                      }
                    >
                      <span className="icon dark:text-textDark text-[1.1rem] text-secondaryText">
                        {item.icon}
                      </span>
                      <span className="dark:text-textDark text-[0.95rem] font-medium text-secondaryText w-max icon-name animate__animated animate__fadeIn">
                        {item.display}
                      </span>
                    </NavLink>
                  </Tippy>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-6 flex items-center gap-3">
          <Tippy
            onShow={() => (collapse ? true : false)}
            placement="right"
            content={`Giao diện : ${isDarkMode ? "tối" : "sáng"}`}
            theme={isDarkMode ? "dark" : "light"}
          >
            <Switch
              size="medium"
              className="bg-defaultBorder"
              onChange={handleChange}
              checked={isDarkMode}
              checkedChildren={<MoonFilled />}
              unCheckedChildren={<SunFilled />}
              defaultChecked
            />
          </Tippy>
          <span className="dark:text-textDark title-theme">
            {isDarkMode ? "Tối" : "Sáng"}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
