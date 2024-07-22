import { useState } from "react";
import { Card as CardAntd, Col, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import Card from "../Card";
import Modal from "../Modal";

const ListCard = ({ dataTask, refreshData }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="mt-6 h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden px-5">
      <Row gutter={[16, 16]}>
        {dataTask.map((item) => {
          return (
            <Col span={6} lg={6} md={8} sm={12} xs={24} key={item._id}>
              <Card item={item} refreshData={refreshData} />
            </Col>
          );
        })}
        <Col span={6} lg={6} md={8} sm={12} xs={24}>
          <CardAntd
            onClick={handleOpenModal}
            className="dark:bg-[#333333] w-full h-full min-h-[260px] flex items-center justify-center hover:bg-[#fafafa] cursor-pointer dark:hover:bg-defaultBorderDark"
            bordered
          >
            <div className="flex items-center gap-3">
              <AiOutlinePlus className="text-[1.4rem]" />
              <span className="font-medium text-[1rem]">Tạo công việc mới</span>
            </div>
          </CardAntd>
        </Col>
      </Row>
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

export default ListCard;
