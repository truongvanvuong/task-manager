import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Avatar, Modal, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, CameraOutlined, RightOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { authContext } from '../../context/AuthContext.jsx';
import upLoadImageToCloudinary from '../../Utils/uploadCloudinary.js';
import { BASE_URL } from '../../config.js';
import { Input, Button } from '../../Component';
import message from '../../Utils/message.js';
import { getProfile } from '../../authService/authService.js';

const AccountSettings = ({ isModalOpen, setIsModalOpen }) => {
    const url = BASE_URL + '/user';
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { dispatch } = useContext(authContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewUrl] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [nameFields, setNameFields] = useState('');
    const [userData, setUserData] = useState({});
    const [editFields, setEditField] = useState({
        fullName: false,
        userName: false,
        email: false,
        oldPassword: false,
        newPassword: false,
        avatar: false,
    });
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const fullNameRef = useRef(null);
    const userNameRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getProfile();

                setUserInfo(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user info', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = (field) => {
        setEditField((prevEditField) => ({
            ...prevEditField,
            [field]: true,
        }));
        switch (field) {
            case 'fullName':
                fullNameRef.current.focus();
                setNameFields('Họ và Tên');
                break;
            case 'userName':
                userNameRef.current.focus();
                setNameFields('Tên người dùng');
                break;
            case 'email':
                emailRef.current.focus();
                setNameFields('Email');
                break;
            case 'avatar':
                setNameFields('Avatar');
                break;
            default:
                console.error('Invalid field');
        }
    };

    const handleOnChangeInput = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const onSave = async (field) => {
        let updatedUserData = { ...userData };

        if (field === 'avatar') {
            const { success, data } = await upLoadImageToCloudinary(selectedFile);
            updatedUserData.avatarUrl = success ? data.url : '';
        }

        try {
            const { data: user } = await axios.put(`${url}/${userData._id}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (user.success) {
                setUserData(updatedUserData);
                dispatch({ type: 'UPDATE_USER', payload: { user: user.data, token: token } });
                message('success', `${nameFields} ${user.message}`);
                setEditField((prevEditField) => ({
                    ...prevEditField,
                    [field]: false,
                }));
            }
        } catch (error) {
            const { data } = error.response;
            message('error', `${nameFields} ${data.message}`);
            console.log(error);
        }
    };

    const onCancel = (field) => {
        setUserData(userInfo);
        setEditField((prevEditField) => ({
            ...prevEditField,
            [field]: false,
        }));
        if (field === 'avatar') {
            setPreviewUrl(null);
        }
    };

    const handleUploadOnchange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
        setEditField((prev) => ({ ...prev, avatar: true }));
    };
    const handleShowChangePassword = () => {
        setShowChangePassword((prev) => !prev);
        setEditField((prevEditField) => ({
            ...prevEditField,
            oldPassword: showChangePassword,
            newPassword: showChangePassword,
        }));
    };
    const handleOnCancelModal = () => {
        setEditField({
            userName: false,
            fullName: false,
            email: false,
            avatar: false,
        });
        setShowChangePassword(false);
        setIsModalOpen(!isModalOpen);
        setNewPassword('');
        setOldPassword('');
        setPreviewUrl(null);
    };
    const handleChangePassword = async () => {
        if (oldPassword && newPassword.length >= 6) {
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                const response = await axios.put(
                    `${url}/change-password`,
                    {
                        oldPassword,
                        newPassword,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                message('success', response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 800);
            } catch (err) {
                const { data, status } = err.response;

                if (status == 400) {
                    setEditField((prev) => ({
                        ...prev,
                        oldPassword: data.message,
                    }));
                } else {
                    message('error', data.message);
                }
            }
        } else {
            setEditField((prev) => ({
                ...prev,
                oldPassword: !oldPassword ? 'Nhập mật khẩu cũ' : false,
                newPassword: !newPassword ? 'Nhập mật khẩu mới' : false,
            }));
        }
    };
    const handleDeleteAccount = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.delete(`${url}/${user._id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.data.success) {
                message('success', response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 800);
            }
        } catch (error) {
            console.error(error);
            message.error(error.response.data.message || 'Failed to delete account');
        }
    };
    return (
        <Modal centered width={1000} footer={false} open={isModalOpen} onCancel={handleOnCancelModal}>
            <div className="mt-4 w-full flex lg:flex-row flex-col gap-10 lg:gap20">
                <div className="lg:w-[25%] w-full flex flex-col items-center">
                    <Input type="file" id="uploadFile" className="hidden" onChange={handleUploadOnchange} />
                    <label htmlFor="uploadFile">
                        <div className="relative cursor-pointer">
                            {userData?.avatarUrl || previewURL ? (
                                <Avatar
                                    size={{ xs: 120, sm: 120, md: 160, lg: 200, xl: 200 }}
                                    alt={userData?.fullname}
                                    src={previewURL || userData?.avatarUrl}
                                />
                            ) : (
                                <Avatar
                                    size={{ xs: 120, sm: 120, md: 160, lg: 200, xl: 200 }}
                                    icon={<UserOutlined />}
                                />
                            )}
                            <div
                                className="flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-[50%] bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-100 transition-opacity"
                                onClick={() => handleEdit('avatar')}
                            >
                                <CameraOutlined className="text-[2.2rem] text-[#0000008a] " />
                            </div>
                        </div>
                    </label>
                    {editFields.avatar && (
                        <div className="flex items-center gap-3 mt-4">
                            <Button
                                onClick={() => onSave('avatar')}
                                outline
                                small
                                roundedBorder
                                className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                            >
                                Lưu
                            </Button>
                            <Button
                                onClick={() => onCancel('avatar')}
                                outline
                                small
                                roundedBorder
                                className="text-[#0000008a] font-normal hover:opacity-65"
                            >
                                Hủy
                            </Button>
                        </div>
                    )}
                    <div className="mt-4 text-center text-[1.1rem]">
                        <h4 className="font-medium">{userData?.fullname}</h4>
                        <p className="font-normal">@{userData?.username ? userData.username : 'Chưa thiết lập'}</p>
                    </div>
                </div>
                <div className="w-full lg:w-[75%] md:px-3">
                    <h1 className="text-[26px] font-semibold py-3 mb-5 border-b border-defaultBorder dark:border-defaultBorderDark">
                        Thông tin cá nhân
                    </h1>
                    <div
                        className={`${
                            showChangePassword ? 'overflow- h-[420px]' : 'overflow-hidden'
                        } px-2 overflow-overlay`}
                    >
                        <div className="py-3">
                            <label className="text-[1.1rem] font-medium" htmlFor="fullname">
                                Họ và tên
                            </label>
                            <div className="flex gap-4 justify-between items-center">
                                <div className="flex-1 max-w-[500px]">
                                    <Input
                                        inputRef={fullNameRef}
                                        inputClassName="text-[1rem]"
                                        type="text"
                                        id="fullname"
                                        onChange={handleOnChangeInput}
                                        placeholder="Chưa thiết lập"
                                        value={userData?.fullname}
                                        bordered={editFields.fullName}
                                        readOnly={!editFields.fullName}
                                    />
                                </div>
                                <div className="flex">
                                    {editFields.fullName ? (
                                        <div className="flex items-center gap-3 animate__animated animate__fadeIn">
                                            <Button
                                                onClick={() => onSave('fullName')}
                                                outline
                                                small
                                                roundedBorder
                                                className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                                            >
                                                Lưu
                                            </Button>
                                            <Button
                                                onClick={() => onCancel('fullName')}
                                                outline
                                                small
                                                roundedBorder
                                                className="text-[#0000008a] font-normal hover:opacity-65"
                                            >
                                                Hủy
                                            </Button>
                                        </div>
                                    ) : (
                                        <Tooltip placement="top" title="Chỉnh sửa">
                                            <EditOutlined
                                                onClick={() => handleEdit('fullName')}
                                                className="font-normal animate__animated animate__fadeInRight text-[1.2rem]"
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="py-3">
                            <label className="text-[1rem] font-medium" htmlFor="username">
                                Tên người dùng
                            </label>
                            <div className="flex gap-4 justify-between items-center">
                                <div className="flex-1 max-w-[500px]">
                                    <Input
                                        inputRef={userNameRef}
                                        type="text"
                                        inputClassName="text-[1rem]"
                                        bordered={editFields.userName}
                                        onChange={handleOnChangeInput}
                                        id="username"
                                        value={userData?.username}
                                        placeholder="Chưa thiết lập"
                                        readOnly={!editFields.userName}
                                    />
                                </div>
                                <div className="flex">
                                    {editFields.userName ? (
                                        <div className="flex items-center gap-3 animate__animated animate__fadeIn">
                                            <Button
                                                onClick={() => onSave('userName')}
                                                outline
                                                small
                                                roundedBorder
                                                className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                                            >
                                                Lưu
                                            </Button>
                                            <Button
                                                onClick={() => onCancel('userName')}
                                                outline
                                                small
                                                roundedBorder
                                                className="text-[#0000008a] font-normal hover:opacity-65"
                                            >
                                                Hủy
                                            </Button>
                                        </div>
                                    ) : (
                                        <Tooltip placement="top" title="Chỉnh sửa">
                                            <EditOutlined
                                                onClick={() => handleEdit('userName')}
                                                className="font-normal animate__animated animate__fadeInRight text-[1.2rem]"
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="py-3">
                            <label className="text-[1rem] font-medium" htmlFor="email">
                                Email
                            </label>
                            <div className="flex gap-4 justify-between items-center">
                                <div className="flex-1 max-w-[500px]">
                                    <Input
                                        inputRef={emailRef}
                                        onChange={handleOnChangeInput}
                                        type="Email"
                                        bordered={editFields.email}
                                        inputClassName="text-[1rem]"
                                        id="email"
                                        placeholder="Chưa thiết lập"
                                        value={userData?.email}
                                        readOnly={!editFields.email}
                                    />
                                </div>
                                <div className="flex">
                                    {editFields.email ? (
                                        <div className="flex items-center gap-3 animate__animated animate__fadeIn">
                                            <Button
                                                onClick={() => onSave('email')}
                                                outline
                                                small
                                                roundedBorder
                                                className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                                            >
                                                Lưu
                                            </Button>
                                            <Button
                                                onClick={() => onCancel('email')}
                                                outline
                                                small
                                                roundedBorder
                                                className="text-[#0000008a] font-normal hover:opacity-65"
                                            >
                                                Hủy
                                            </Button>
                                        </div>
                                    ) : (
                                        <Tooltip placement="top" title="Chỉnh sửa">
                                            <EditOutlined
                                                onClick={() => handleEdit('email')}
                                                className="font-normal animate__animated animate__fadeInRight text-[1.2rem]"
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="py-3 w-full lg:w-[65%]">
                            <div
                                className="items-center gap-[6px] cursor-pointer inline-flex"
                                onClick={handleShowChangePassword}
                            >
                                <RightOutlined
                                    className={`${
                                        showChangePassword ? 'rotate-90' : 'rotate-0'
                                    } transition-all duration-300`}
                                />
                                <label className="text-[1rem] font-medium cursor-pointer" htmlFor="changePassword">
                                    Thay đổi mật khẩu
                                </label>
                            </div>
                            {showChangePassword && (
                                <div className="flex-col gap-6 mt-4 flex animate__animated animate__fadeIn">
                                    <div>
                                        <label
                                            htmlFor="oldPassword"
                                            className="text-[0.95rem] font-normal cursor-pointer"
                                        >
                                            Mật khẩu cũ
                                        </label>
                                        <Input
                                            passWord
                                            type="password"
                                            bordered
                                            value={oldPassword}
                                            onChange={(e) => {
                                                setOldPassword(e.target.value);
                                                setEditField((prev) => ({
                                                    ...prev,
                                                    oldPassword: false,
                                                }));
                                            }}
                                            wrapInputClassName="!py-0"
                                            inputClassName="text-[1rem]"
                                            id="oldPassword"
                                            messError={editFields.oldPassword}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="newPassword"
                                            className="text-[0.95rem] font-normal cursor-pointer"
                                        >
                                            Mật khẩu mới
                                        </label>
                                        <Input
                                            passWord
                                            type="password"
                                            bordered
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setEditField((prev) => ({
                                                    ...prev,
                                                    newPassword:
                                                        e.target.value.length < 6
                                                            ? 'Độ dài mật khẩu từ 6 ký tự trở lên'
                                                            : false,
                                                }));
                                            }}
                                            wrapInputClassName="!py-0"
                                            inputClassName="text-[1rem]"
                                            id="newPassword"
                                            messError={editFields.newPassword}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            medium
                                            primary
                                            className="hover:brightness-110 transition-all float-right"
                                            onClick={handleChangePassword}
                                        >
                                            Lưu
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <h3 className="text-[1rem] font-medium">Xóa tài khoản</h3>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="w-full md:w-[70%]">
                                    Một khi bạn xóa tài khoản của mình, sẽ không có cách nào khôi phục lại được nữa. Hãy
                                    chắc chắn.
                                </p>
                                <Popconfirm
                                    title="Xóa tài khoản"
                                    description="Bạn có chắc chắn muốn xóa tài khoản?"
                                    onConfirm={handleDeleteAccount}
                                    icon={
                                        <QuestionCircleOutlined
                                            style={{
                                                color: 'red',
                                            }}
                                        />
                                    }
                                >
                                    <Button primary className="bg-red-600 border-red-600" medium>
                                        Xóa tài khoản
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

AccountSettings.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
};

export default AccountSettings;
