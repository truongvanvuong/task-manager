import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { Context } from "../../App.jsx";
import { AiFillHome, AiFillProfile, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiFileList2Fill } from "react-icons/ri";
import { BsClipboard2CheckFill, BsArrowLeft } from "react-icons/bs";
import { MoonFilled, SunFilled, UserOutlined } from "@ant-design/icons";
import { Switch, Popover, Avatar } from "antd";
import Tippy from "@tippyjs/react";
import { getProfile, logout } from "../../authService/authService.js";

const navs = [
  {
    icon: <AiFillHome />,
    display: "Toàn bộ",
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
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfile();
        setUserInfo(response.data);
      } catch (error) {
        setError("Error fetching user info");
        console.error("Error fetching user info", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    setUserInfo(null);
    navigate("/login");
  };

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
    setCollapse((prev) => !prev);
  };
  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };
  const contentPopover = (
    <div className="px-4 py-3">
      <div className="flex items-center gap-4 pb-6 border-b border-defaultBorder dark:border-defaultBorderDark">
        <div>
          {userInfo?.avatar ? (
            <Avatar size={48} src={userInfo?.avatar} />
          ) : (
            <Avatar size={48} icon={<UserOutlined />} />
          )}
        </div>
        <div>
          <h2 className="font-medium dark:text-textDark text-[1rem]">
            {userInfo?.fullname}
          </h2>
          <h3 className="font-normal dark:text-textDark text-secondaryText text-[0.9rem]">
            {userInfo?.username ? `@${userInfo.username}` : "Tên người dùng"}
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
        <span
          className="hover:opacity-80 cursor-pointer"
          onClick={handleLogout}
        >
          Đăng xuất
        </span>
      </div>
    </div>
  );
  return (
    <aside className="border border-defaultBorder dark:border-defaultBorderDark dark:bg-gray rounded-xl shadow-lg">
      <div
        className={`my-4 h-[calc(100%-2rem)] flex flex-shrink-0 flex-grow-0 flex-col justify-between transition-all duration-200 ${
          collapse
            ? "w-[80px] min-w-[80px] max-w-[80px] basis-[80px]"
            : "w-[220px] min-w-[220px] max-w-[220px] basis-[220px]"
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
            <div className="cursor-pointer">
              {userInfo?.avatar ? (
                <Avatar
                  className="transition-all duration-300"
                  size={collapse ? 36 : 48}
                  src={userInfo?.avatar}
                />
              ) : (
                <Avatar
                  className="transition-all duration-300"
                  size={collapse ? 36 : 48}
                  icon={<UserOutlined />}
                />
              )}
            </div>
          </Popover>
          {!collapse && (
            <h2 className="user-name text-[1rem] dark:text-textDark font-medium">
              {userInfo?.fullname}
            </h2>
          )}
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
          <ul className="w-auto">
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
                          ? "bg-separator dark:bg-defaultBorderDark flex items-center gap-3 px-6 h-9 border-r-4 border-primaryColor transition-all duration-[400ms]"
                          : "hover:bg-layoutBackground dark:hover:bg-separatorDark flex items-center h-9 gap-3 px-6 border-r-4 border-transparent"
                      }
                    >
                      <span className="dark:text-textDark text-[1rem] text-secondaryText">
                        {item.icon}
                      </span>
                      {!collapse && (
                        <span
                          className={`dark:text-textDark text-[1rem] font-mediumdi text-secondaryText w-max transition-none`}
                        >
                          {item.display}
                        </span>
                      )}
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
