import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import locale from "antd/es/date-picker/locale/vi_VN.js";
import dayjs from "dayjs";
import { Modal as ModalAntd, DatePicker, Checkbox } from "antd";
import axios from "axios";

import { BASE_URL } from "../../config.js";
import { Input } from "../../Component";
import message from "../../Utils/message.js";

const Modal = ({ open, setOpen, titleModal, mode, taskData, refreshData }) => {
  const currentDate = dayjs();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: currentDate,
    important: false,
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && taskData) {
      setFormData({
        title: taskData.title || "",
        description: taskData.description || "",
        date: dayjs(taskData.date) || currentDate,
        important: taskData.important || false,
        completed: taskData.completed || false,
      });
    }
  }, [mode, taskData]);

  const onChangeDate = (date, dateString) => {
    setFormData((prev) => ({ ...prev, date: date }));
  };

  const handleOnChangeInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };

  const onChangeCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, important: e.target.checked }));
  };

  const handleOk = async () => {
    const newErrors = {
      title: !formData.title ? "Nhập tiêu đề công việc" : null,
      description: !formData.description ? "Nhập nội mô tả công việc" : null,
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);

    if (!hasError) {
      const url = `${BASE_URL}/task${
        mode === "edit" ? `/${taskData._id}` : ""
      }`;
      setConfirmLoading(true);
      try {
        const response = await axios({
          method: `${mode === "edit" ? "put" : "post"}`,
          url: url,
          data: formData,
        });

        const { data } = response;

        if (data.success) {
          setTimeout(() => {
            setConfirmLoading(false);
            setOpen(false);
          }, 800);

          setTimeout(() => {
            refreshData();
            message("success", "Đã thêm công việc mới");
          }, 1000);

          if (mode === "add") {
            setFormData({
              title: "",
              description: "",
              date: currentDate,
              important: false,
              completed: false,
            });
          }
        }
      } catch (error) {
        message("error", "Lỗi, không thành công");
        setConfirmLoading(false);
      }
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      date: currentDate,
      important: false,
      completed: false,
    });
  };
  return (
    <ModalAntd
      title={
        <h1 className="text-[1.4rem] font-medium dark:text-textHeaddingDark">
          {titleModal}
        </h1>
      }
      centered
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      okText={mode === "add" ? "Thêm" : "Lưu"}
      cancelText="Hủy"
      onCancel={handleCancel}
    >
      <div>
        <div className="mt-6">
          <label className="text-[1rem]" htmlFor="title">
            Tiêu đề
          </label>
          <Input
            bordered
            maxLength="40"
            id="title"
            type="text"
            placeholder="Nhập tiêu đề khoảng 60 từ..."
            name="title"
            value={formData.title}
            onChange={handleOnChangeInput}
            messError={errors.title}
          />
          {formData.title.length >= 40 && (
            <p className="mt-2 text-orange-400 text-[0.9rem] animate__animated animate__fadeIn">
              Nội dung đã đạt đến 40 từ
            </p>
          )}
        </div>
        <div className="mt-6">
          <label className="text-[1rem]" htmlFor="desc">
            Mô tả
          </label>
          <textarea
            placeholder="Nhập mô tả khoảng 120 từ...."
            onChange={handleOnChangeInput}
            maxLength="120"
            id="desc"
            type="text"
            name="description"
            value={formData.description}
            rows={6}
            className="w-full border rounded dark:border-defaultBorderDark bg-transparent border-defaultBorder focus:outline-none mt-4 p-2 focus:border-primaryColor dark:focus:border-primaryColor"
          />
          {errors.description && (
            <p className="mt-2 text-red-600 text-[0.9rem] animate__animated animate__fadeIn">
              {errors.description}
            </p>
          )}
          {formData.description.length >= 120 && (
            <p className="mt-2 text-orange-500 text-[0.9rem] animate__animated animate__fadeIn">
              Nội dung đã đạt đến 120 từ
            </p>
          )}
        </div>
        <div className="mt-6 flex flex-col">
          <label className="text-[1rem]" htmlFor="date">
            Thời gian
          </label>
          <DatePicker
            locale={locale}
            id="date"
            className="mt-4"
            placeholder="Chọn ngày"
            value={formData.date}
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
            onChange={onChangeDate}
          />
        </div>
        <div className="mt-6">
          <label
            htmlFor="important"
            className="text-[1rem] cursor-pointer hover:opacity-90"
          >
            Quan trọng
          </label>
          <Checkbox
            onChange={onChangeCheckbox}
            checked={formData.important}
            className="float-right"
            id="important"
          ></Checkbox>
        </div>
      </div>
    </ModalAntd>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  titleModal: PropTypes.string,
  taskData: PropTypes.object,
  mode: PropTypes.string,
  refreshData: PropTypes.func,
};
export default Modal;
