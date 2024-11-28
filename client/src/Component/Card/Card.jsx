import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import { Card as CardAntd, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled, QuestionOutlined } from '@ant-design/icons';
import { BsStarFill } from 'react-icons/bs';
import axios from 'axios';
import dayjs from 'dayjs';
import Tippy from '@tippyjs/react';

import { Button, Modal } from '../../Component';
import { ContextTheme } from '../../App.jsx';
import { BASE_URL } from '../../config.js';
import message from '../../Utils/message.js';

const Card = ({ item, refreshData }) => {
    const token = localStorage.getItem('token');
    const currentDate = dayjs();
    const { isDarkMode } = useContext(ContextTheme);
    const [openModal, setOpenModal] = useState(false);
    const [taskData, setTaskData] = useState({});
    const url = `${BASE_URL}/task`;

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response;

            if (data.success) {
                setTimeout(() => {
                    message('success', 'Công việc đã được xóa');
                    refreshData();
                }, 500);
            }
        } catch (error) {
            message('error', 'Công việc chưa được xóa');
            console.log(error);
        }
    };

    const handleEditTask = async (id) => {
        setOpenModal(true);
        try {
            const response = await axios.get(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            const response = await axios.put(
                `${url}/${id}`,
                {
                    completed: !completed,
                    date: currentDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
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
            <CardAntd classNames={{ body: 'h-full' }} className="dark:bg-[#333333] w-full h-full shadow-md">
                <div className="flex flex-col justify-between gap-3 h-full">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-[1rem] dark:text-textHeaddingDark">{item.title}</h3>
                            {item.important && <BsStarFill size={18} color="#fa8c16" />}
                        </div>
                        <p className="text-[0.9rem]">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-medium text-[0.95rem]">
                            <span className="float-right">{dayjs(item.date).format('DD-MM-YYYY')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <Button
                                onClick={() => handleStatus(item._id, item.completed)}
                                small
                                roundedBorder
                                className={`${
                                    item.completed ? 'bg-green-600' : 'bg-red-600'
                                } hover:opacity-85 transition-opacity`}
                            >
                                {item.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                            </Button>
                            <div className="flex gap-4 items-center text-[1.2rem]">
                                <Tippy
                                    touch="hold"
                                    content="Chỉnh sửa"
                                    placement="top"
                                    className="dark:border dark:border-defaultBorderDark"
                                    theme={isDarkMode ? 'light' : 'dark'}
                                >
                                    <div onClick={() => handleEditTask(item._id)}>
                                        <EditFilled
                                            className={`${
                                                !isDarkMode && 'text-secondaryText'
                                            } cursor-pointer hover:opacity-85 transition-opacity`}
                                        />
                                    </div>
                                </Tippy>
                                <Tippy
                                    touch="hold"
                                    content="Xóa"
                                    placement="top"
                                    theme={isDarkMode ? 'light' : 'dark'}
                                    className="dark:border dark:border-defaultBorderDark"
                                >
                                    <div>
                                        <Popconfirm
                                            icon={<QuestionOutlined />}
                                            title="Xác nhận xóa"
                                            placement="topRight"
                                            description="Bạn chắc chắn xóa không?"
                                            onConfirm={() => handleDelete(item._id)}
                                            okText="OK"
                                            cancelText="Hủy"
                                        >
                                            <div>
                                                <DeleteFilled
                                                    className={`${
                                                        !isDarkMode && 'text-secondaryText'
                                                    } cursor-pointer hover:opacity-85 transition-opacity`}
                                                />
                                            </div>
                                        </Popconfirm>
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
