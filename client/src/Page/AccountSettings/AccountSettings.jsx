import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Avatar, Upload, Modal, Tooltip } from "antd";
import { EditOutlined, CameraOutlined, RightOutlined } from "@ant-design/icons";
import { Input, Button } from "../../Component";
const AccountSettings = ({ isModalOpen, setIsModalOpen }) => {
  const [editFields, setEditField] = useState({
    fullName: false,
    userName: false,
    email: false,
  });
  const [ShowChangePassword, setShowChangePassword] = useState(false);
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();

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

  const onSave = () => {};

  const onCancel = (field) => {
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
  };
  return (
    <Modal
      centered
      width={1000}
      open={isModalOpen}
      footer={false}
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
              <Avatar
                className=""
                size={200}
                alt="name"
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
              />
              <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-[50%] bg-[rgba(0,0,0,0.08)] opacity-0 hover:opacity-100 transition-opacity">
                <CameraOutlined className="text-[2.2rem] text-[#0000008a]" />
              </div>
            </div>
          </Upload>
          <div className="mt-4 text-center text-[1.1rem]">
            <h4 className="font-medium">Trương Văn Vượng</h4>
            <p className="font-normal">@vanvuong</p>
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
                  wrapInputClassName="!py-0"
                  inputClassName="text-[1rem]"
                  type="text"
                  id="fullname"
                  value="vanvuong"
                  bordered={editFields.fullName}
                  readOnly={!editFields.fullName}
                />
              </div>
              <div className="flex">
                {editFields.fullName ? (
                  <div className="flex items-center gap-3 animate__animated animate__fadeIn">
                    <Button
                      onClick={onSave}
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
                  wrapInputClassName="!py-0"
                  inputClassName="text-[1rem]"
                  bordered={editFields.userName}
                  id="username"
                  value="vanvuong"
                  readOnly={!editFields.userName}
                />
              </div>
              <div className="flex">
                {editFields.userName ? (
                  <div className="flex items-center gap-3 animate__animated animate__fadeIn">
                    <Button
                      onClick={onSave}
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
                  type="Email"
                  bordered={editFields.email}
                  wrapInputClassName="!py-0"
                  inputClassName="text-[1rem]"
                  id="email"
                  value="vanvuong"
                  readOnly={!editFields.email}
                />
              </div>
              <div className="flex">
                {editFields.email ? (
                  <div className="flex items-center gap-3 animate__animated animate__fadeIn">
                    <Button
                      onClick={onSave}
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
                    wrapInputClassName="!py-0"
                    inputClassName="text-[1rem]"
                    id="oldPassword"
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
                    wrapInputClassName="!py-0"
                    inputClassName="text-[1rem]"
                    id="newPassword"
                  />
                </div>
                <div>
                  <Button
                    medium
                    primary
                    className="hover:brightness-110 transition-all float-right"
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
