import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { ContextTheme } from '../../App.jsx';
import { AiFillHome, AiFillProfile, AiOutlineMenuUnfold } from 'react-icons/ai';
import { RiFileList2Fill } from 'react-icons/ri';
import { BsClipboard2CheckFill, BsArrowLeft } from 'react-icons/bs';
import { MoonFilled, SunFilled, UserOutlined } from '@ant-design/icons';
import { Switch, Popover, Avatar } from 'antd';
import Tippy from '@tippyjs/react';
import { authContext, logoutUser } from '../../context/AuthContext.jsx';

const navs = [
    {
        icon: <AiFillHome className="w-full" />,
        display: 'Toàn bộ',
        path: '/home',
    },
    {
        icon: <AiFillProfile className="flex-1" />,
        display: 'Quan trọng',
        path: '/important',
    },
    {
        icon: <BsClipboard2CheckFill className="flex-1" />,
        display: 'Hoàn thành',
        path: '/completed',
    },
    {
        icon: <RiFileList2Fill className="flex-1" />,
        display: 'Chưa hoàn thành',
        path: '/incompleted',
    },
];
const Sidebar = ({ setIsModalOpen }) => {
    const { dispatch, user } = useContext(authContext);
    const { isDarkMode, setIsDarkMode } = useContext(ContextTheme);
    const [showSidebar, setShowSidebar] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const [isShow, setIsShow] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(dispatch);
        navigate('/login');
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
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleSideBar = () => {
        setCollapse((prev) => !prev);
        setTimeout(() => {
            setIsShow(collapse);
        }, 200);
    };
    const handleOpenChange = (newOpen) => {
        setOpenPopover(newOpen);
    };
    const handleShowSideBar = () => {
        setShowSidebar((prev) => !prev);
    };
    const contentPopover = (
        <div className="px-4 py-3 min-w-[220px]">
            <div className="flex items-center gap-4 pb-6 border-b border-defaultBorder dark:border-defaultBorderDark">
                <div>
                    {user?.avatarUrl ? (
                        <Avatar size={48} src={user?.avatarUrl} />
                    ) : (
                        <Avatar size={48} icon={<UserOutlined />} />
                    )}
                </div>
                <div>
                    <h2 className="font-medium dark:text-textDark text-[1rem">{user?.fullname}</h2>
                    <h3 className="font-normal dark:text-textDark text-secondaryText text-[0.9rem]">
                        {user?.username ? `@${user.username}` : 'Chưa thiết lập'}
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
                <span className="hover:opacity-80 cursor-pointer" onClick={handleLogout}>
                    Đăng xuất
                </span>
            </div>
        </div>
    );
    return (
        <div>
            <aside
                className={`border border-defaultBorder dark:border-defaultBorderDark dark:bg-gray rounded-r-xl h-full lg:rounded-xl shadow-lg wrap-sidebar ${
                    showSidebar && 'translate-x-0'
                }`}
            >
                <div
                    className={`my-4 h-[calc(100%-2rem)] flex flex-shrink-0 flex-grow-0 flex-col justify-between transition-sidebar ${
                        collapse
                            ? 'lg:items-center lg:w-[80px] lg:min-w-[80px] lg:max-w-[80px] lg:basis-[80px] w-[220px] min-w-[220px] max-w-[220px] basis-[220px]'
                            : 'w-[220px] min-w-[220px] max-w-[220px] basis-[220px]'
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
                                {user?.avatarUrl ? (
                                    <Avatar
                                        className="transition-all duration-300"
                                        size={collapse ? 36 : 48}
                                        src={user?.avatarUrl}
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

                        <h2
                            className={`${isShow ? '' : 'lg:hidden'} ${
                                collapse && 'lg:hidden'
                            } text-[1rem] dark:text-textDark font-medium animate__animated animate__fadeIn animate__delay-0.1s`}
                        >
                            {user?.fullname}
                        </h2>

                        <Tippy
                            placement="right"
                            className="hidden"
                            content={collapse ? 'Mở rộng' : 'Thu gọn'}
                            theme={isDarkMode ? 'dark' : 'light'}
                        >
                            <div
                                className="absolute w-8 h-8 hidden xl:flex border-defaultBorder border rounded-md items-center justify-center -right-0 translate-x-1/2 bg-white shadow-xl cursor-pointer dark:bg-gray dark:border-defaultBorderDark"
                                onClick={handleSideBar}
                            >
                                {collapse ? (
                                    <AiOutlineMenuUnfold className="text-[1.2rem] text-textColor dark:text-textDark" />
                                ) : (
                                    <BsArrowLeft className="text-[1.2rem] text-textColor dark:text-textDark" />
                                )}
                            </div>
                        </Tippy>
                        <div
                            onClick={handleShowSideBar}
                            className={`absolute w-10 h-10 border-defaultBorder border rounded-md flex items-center justify-center top-8 -right-0 ${
                                showSidebar ? 'translate-x-1/2' : 'translate-x-full'
                            } bg-white shadow-xl cursor-pointer dark:bg-gray dark:border-defaultBorderDark xl:hidden`}
                        >
                            {showSidebar ? (
                                <BsArrowLeft className="text-[1.4rem] text-textColor dark:text-textDark" />
                            ) : (
                                <AiOutlineMenuUnfold className="text-[1.4rem] text-textColor dark:text-textDark" />
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <ul>
                            {navs.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Tippy
                                            onShow={() => (collapse ? true : false)}
                                            placement="right"
                                            content={item.display}
                                            theme={isDarkMode ? 'dark' : 'light'}
                                        >
                                            <NavLink
                                                to={item.path}
                                                className={(navClass) =>
                                                    navClass.isActive
                                                        ? `bg-separator dark:bg-defaultBorderDark flex items-center gap-3 px-6 h-9 border-r-4 border-primaryColor`
                                                        : `hover:bg-layoutBackground dark:hover:bg-separatorDark flex items-center h-9 gap-3 px-6 border-r-4 border-transparent`
                                                }
                                            >
                                                <span
                                                    className={`dark:text-textDark inline-flex ${
                                                        collapse ? 'lg:w-full' : 'w-max'
                                                    } text-secondaryText`}
                                                >
                                                    {item.icon}
                                                </span>

                                                <span
                                                    className={`${isShow ? '' : 'lg:hidden'} ${
                                                        collapse && 'lg:hidden'
                                                    } dark:text-textDark text-[1rem] font-medium text-secondaryText w-max animate__animated animate__fadeIn animate__delay-0.1s`}
                                                >
                                                    {item.display}
                                                </span>
                                            </NavLink>
                                        </Tippy>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex items-center gap-3 px-6">
                        <Tippy
                            onShow={() => (collapse ? true : false)}
                            placement="right"
                            content={`Giao diện : ${isDarkMode ? 'tối' : 'sáng'}`}
                            theme={isDarkMode ? 'dark' : 'light'}
                        >
                            <Switch
                                onChange={handleChange}
                                checked={isDarkMode}
                                checkedChildren={<MoonFilled />}
                                unCheckedChildren={<SunFilled />}
                                defaultChecked
                            />
                        </Tippy>
                        <span className={`dark:text-textDark title-theme ${collapse && 'lg:hidden'}`}>
                            {isDarkMode ? 'Tối' : 'Sáng'}
                        </span>
                    </div>
                </div>
            </aside>
            {showSidebar && (
                <div
                    className="fixed z-[50] inset-0 xl:hidden bg-[#00000084] duration-300 transition-all"
                    onClick={handleShowSideBar}
                ></div>
            )}
        </div>
    );
};

Sidebar.propTypes = {
    setIsModalOpen: PropTypes.func,
};
export default Sidebar;
