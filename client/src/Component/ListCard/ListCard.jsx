import { useState } from 'react';
import { Col, Row } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import PropTypes from 'prop-types';

import Card from '../Card';
import Modal from '../Modal';
import Button from '../Button';

const ListCard = ({ dataTask, refreshData, imgNoTask, titleNoTask }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    return (
        <div className="mt-6 lg:h-[calc(100vh-160px)] md:h-[calc(100vh-310px)] h-[calc(100vh-270px)] overflow-y-auto overflow-x-hidden px-5 relative">
            <Row gutter={[16, 16]} className="relative z-10">
                {dataTask.map((item) => {
                    return (
                        <Col span={6} xl={6} lg={8} md={12} sm={24} xs={24} key={item._id}>
                            <Card item={item} refreshData={refreshData} />
                        </Col>
                    );
                })}
            </Row>
            {dataTask.length <= 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center h-full opacity-90 z-0">
                    <figure className="w-56 h-56">
                        <img className="h-full w-full" src={imgNoTask} alt=" No Task" />
                    </figure>
                    <p className="text-[1.1rem]">{titleNoTask}</p>
                </div>
            )}
            <div className="fixed right-5 bottom-4 lg:right-10 lg:bottom-10 z-[40]">
                <Button
                    onClick={handleOpenModal}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    primary
                >
                    <AiOutlinePlus size={22} />
                </Button>
            </div>
            <Modal
                titleModal="Thêm công việc mới"
                open={openModal}
                setOpen={setOpenModal}
                btnText="Thêm"
                refreshData={refreshData}
                mode="add"
            />
        </div>
    );
};

ListCard.propTypes = {
    dataTask: PropTypes.array,
    refreshData: PropTypes.func,
    imgNoTask: PropTypes.string,
    titleNoTask: PropTypes.string,
};
export default ListCard;
