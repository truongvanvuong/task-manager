import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Avatar, Upload, Modal, Tooltip } from "antd";
import {
  EditOutlined,
  CameraOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { BASE_URL } from "../../config.js";
import { Input, Button } from "../../Component";
import message from "../../Utils/message.js";
import { getProfile } from "../../authService/authService.js";

const AccountSettings = ({ isModalOpen, setIsModalOpen }) => {
  const url = BASE_URL + "/user";

  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useState({});
  const [editFields, setEditField] = useState({
    fullName: false,
    userName: false,
    email: false,
    oldPassword: false,
    newPassword: false,
  });
  const [ShowChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfile();
        setUserInfo(response.data);
        setUserData(response.data);
      } catch (error) {
        setError("Error fetching user info");
        console.error("Error fetching user info", error);
      }
    };

    fetchUserData();
  }, []);

  console.log("re-render");
  const handleEdit = (field) => {
    setEditField((prevEditField) => ({
      ...prevEditField,
      [field]: true,
    }));
    switch (field) {
      case "fullName":
        fullNameRef.current.focus();
        break;
      case "userName":
        userNameRef.current.focus();
        break;
      case "email":
        emailRef.current.focus();
        break;
      default:
        console.error("Invalid field");
    }
  };

  const handleOnChangeInput = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSave = async (field) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const { data } = await axios.put(`${url}/${userData._id}`, userData, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Thêm token vào header
        },
      });
      if (data.success) {
        message("success", data.message);
        setEditField((prevEditField) => ({
          ...prevEditField,
          [field]: false,
        }));
      }
    } catch (error) {
      const { data } = error.response;
      message("error", data.message);
      console.log(error);
    }
  };

  const onCancel = (field) => {
    setUserData(userInfo);
    setEditField((prevEditField) => ({
      ...prevEditField,
      [field]: false,
    }));
  };
  const handleUploadOnchange = (info) => {
    console.log(info);
  };
  const handleShowChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };
  const handleOnCancelModal = () => {
    setEditField({
      fullName: false,
      userName: false,
      email: false,
    });
    setShowChangePassword(false);
    setIsModalOpen(!isModalOpen);
    setNewPassword("");
    setOldPassword("");
  };
  const handleChangePassword = async () => {
    if (oldPassword && newPassword >= 6) {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.put(
          `${url}/change-password`,
          {
            oldPassword,
            newPassword,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log(response.status);

        message("success", response.data.message);
      } catch (err) {
        const { data, status } = err.response;

        if (status == 400) {
          setEditField((prev) => ({
            ...prev,
            oldPassword: data.message,
          }));
        } else {
          message("error", data.message);
        }
      }
    } else {
      setEditField((prev) => ({
        ...prev,
        oldPassword: !oldPassword ? "Nhập mật khẩu cũ" : false,
        newPassword: !newPassword ? "Nhập mật khẩu mới" : false,
      }));
    }
  };

  return (
    <Modal
      centered
      width={1000}
      footer={false}
      open={isModalOpen}
      onCancel={handleOnCancelModal}
    >
      <div className="mt-4 flex gap-20">
        <div className="w-[24%] flex flex-col items-center">
          <Upload
            name="file"
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            multiple={false}
            maxCount={1}
            showUploadList={false}
            onChange={handleUploadOnchange}
          >
            <div className="relative cursor-pointer">
              {userData?.avatar ? (
                <Avatar
                  size={200}
                  alt={userData?.fullname}
                  src={userData?.avatar}
                />
              ) : (
                <Avatar size={200} icon={<UserOutlined />} />
              )}
              <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-[50%] bg-[rgba(0,0,0,0.08)] opacity-0 hover:opacity-100 transition-opacity">
                <CameraOutlined className="text-[2.2rem] text-[#0000008a]" />
              </div>
            </div>
          </Upload>
          <div className="mt-4 text-center text-[1.1rem]">
            <h4 className="font-medium">{userData?.fullname}</h4>
            <p className="font-normal">
              @{userData?.username ? userData.username : "Chưa thiết lập"}
            </p>
          </div>
        </div>
        <div className="w-[60%] px-3">
          <h1 className="text-[26px] font-semibold py-3 mb-5 border-b border-defaultBorder dark:border-defaultBorderDark">
            Thông tin cá nhân
          </h1>
          <div className="py-4">
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
                      onClick={() => onSave("fullName")}
                      outline
                      small
                      roundedBorder
                      className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                    >
                      Lưu
                    </Button>
                    <Button
                      onClick={() => onCancel("fullName")}
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
                      onClick={() => handleEdit("fullName")}
                      className="font-normal animate__animated animate__fadeInRight text-[1.2rem]"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <div className="py-4">
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
                      onClick={() => onSave("userName")}
                      outline
                      small
                      roundedBorder
                      className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                    >
                      Lưu
                    </Button>
                    <Button
                      onClick={() => onCancel("userName")}
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
                      onClick={() => handleEdit("userName")}
                      className="font-normal animate__animated animate__fadeInRight text-[1.2rem]"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <div className="py-4">
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
                      onClick={() => onSave("email")}
                      outline
                      small
                      roundedBorder
                      className="font-normal border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white"
                    >
                      Lưu
                    </Button>
                    <Button
                      onClick={() => onCancel("email")}
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
                      onClick={() => handleEdit("email")}
                      className="font-normal animate__animated animate__fadeInRight text-[1.2rem]"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <div className="py-4 w-[65%]">
            <div
              className="items-center gap-[6px] cursor-pointer inline-flex"
              onClick={handleShowChangePassword}
            >
              <RightOutlined
                className={`${
                  ShowChangePassword ? "rotate-90" : "rotate-0"
                } transition-all duration-300`}
              />
              <label
                className="text-[1rem] font-medium cursor-pointer"
                htmlFor="changePassword"
              >
                Thay đổi mật khẩu
              </label>
            </div>
            {ShowChangePassword && (
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
                            ? "Độ dài mật khẩu từ 6 ký tự trở lên"
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
