import PropTypes from "prop-types";
import { useContext, useState } from "react";

import { Card as CardAntd, Popconfirm } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import dayjs from "dayjs";
import Tippy from "@tippyjs/react";

import { Button, Modal } from "../../Component";
import { Context } from "../../App.jsx";
import { BASE_URL } from "../../config.js";
import message from "../../Utils/message.js";

const Card = ({ item, refreshData }) => {
  const currentDate = dayjs();
  const { isDarkMode } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [taskData, setTaskData] = useState({});
  const url = `${BASE_URL}/task`;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      const { data } = response;

      if (data.success) {
        message("success", "Công việc đã được xóa");
        refreshData();
      }
    } catch (error) {
      message("error", "Công việc chưa được xóa");
      console.log(error);
    }
  };

  const handleEditTask = async (id) => {
    setOpenModal(true);
    try {
      const response = await axios.get(`${url}/${id}`);
      const result = response.data;
      if (result.success) {
        setTaskData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatus = async (id, completed) => {
    try {
      const response = await axios.put(`${url}/${id}`, {
        completed: !completed,
        date: currentDate,
      });
      const { data } = response;

      if (data.success) {
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <CardAntd
        classNames={{ body: "h-full" }}
        className="dark:bg-[#333333] border-defaultBorder dark:border-defaultBorderDark w-full h-full"
        bordered
      >
        <div className="flex flex-col justify-between gap-3 h-full">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-[1rem] dark:text-textHeaddingDark">
              {item.title}
            </h3>
            <p className="text-[0.9rem]">{item.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium text-[0.95rem]">
              <span className="float-right">
                {dayjs(item.date).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => handleStatus(item._id, item.completed)}
                medium
                roundedBorder
                className={`${
                  item.completed ? "bg-green-600" : "bg-red-600"
                } hover:opacity-85 transition-opacity`}
              >
                {item.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
              </Button>
              <div className="flex gap-4 items-center text-[1.4rem]">
                <Tippy
                  content="Chỉnh sửa"
                  placement="top"
                  className="dark:border dark:border-defaultBorderDark"
                  theme={isDarkMode ? "light" : "dark"}
                >
                  <div>
                    <AiFillEdit
                      onClick={() => handleEditTask(item._id)}
                      className={`${
                        !isDarkMode && "text-secondaryText"
                      } cursor-pointer hover:opacity-85 transition-opacity`}
                    />
                  </div>
                </Tippy>
                <Tippy
                  content="Xóa"
                  placement="top"
                  theme={isDarkMode ? "light" : "dark"}
                  className="dark:border dark:border-defaultBorderDark"
                >
                  <div onClick={() => handleDelete(item._id)}>
                    <AiFillDelete
                      className={`${
                        !isDarkMode && "text-secondaryText"
                      } cursor-pointer hover:opacity-85 transition-opacity`}
                    />
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
      </CardAntd>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        mode="edit"
        titleModal="Chỉnh sửa công việc"
        refreshData={refreshData}
        taskData={taskData}
      />
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  refreshData: PropTypes.func,
};

export default Card;
