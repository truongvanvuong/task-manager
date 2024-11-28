import { useState } from 'react';
import { Spin, Pagination } from 'antd';

import { HeadingPage, ListCard } from '../../Component';
import useFetch from '../../Hook/useFetch.js';
import { BASE_URL } from '../../config.js';
import filterTasksByDate from '../../Utils/filterTasksByDate.js';

import imgNoTask from '../../assets/image/tasks-rafiki.png';
const InCompleted = () => {
    const url = `${BASE_URL}/task/incompletes`;
    const { data, dataTasks, loading, error, refresh, setPage } = useFetch(url);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filterType, setFilterType] = useState(null);

    const tasksData = selectedDate === null ? dataTasks : filterTasksByDate(dataTasks, filterType, selectedDate);

    const onChangeDate = (date, dateString) => {
        setFilterType('specific');
        setSelectedDate(date);
    };
    const handlePagination = (page) => {
        setPage(page);
    };
    return (
        <div className="h-full flex flex-col justify-between">
            <HeadingPage
                title="Chưa hoàn thành"
                onChangeDate={onChangeDate}
                setFilterType={setFilterType}
                setSelectedDate={setSelectedDate}
            />
            <div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center lg:h-[calc(100vh-160px)] md:h-[calc(100vh-310px)] h-[calc(100vh-270px)] opacity-90">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div>
                        <ListCard
                            dataTask={tasksData}
                            refreshData={() => refresh()}
                            imgNoTask={imgNoTask}
                            titleNoTask="Bạn đã hoàn thành hết công việc của mình, thật tuyệt vời!"
                        />
                    </div>
                )}
            </div>
            {tasksData.length > 0 && (
                <div className="my-2 px-5">
                    <Pagination
                        total={data.total}
                        current={data.page}
                        pageSize={data.pageSize}
                        defaultCurrent={1}
                        onChange={handlePagination}
                    />
                </div>
            )}
        </div>
    );
};

export default InCompleted;
