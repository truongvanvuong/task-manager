import { useState } from 'react';
import { Spin, Pagination } from 'antd';

import { HeadingPage, ListCard } from '../../Component';
import useFetch from '../../Hook/useFetch.js';
import { BASE_URL } from '../../config.js';
import filterTasksByDate from '../../Utils/filterTasksByDate.js';

import imgNoTask from '../../assets/image/analysis-pana.png';
const Important = () => {
    const url = `${BASE_URL}/task/importants`;

    const [selectedDate, setSelectedDate] = useState(null);
    const [filterType, setFilterType] = useState(null);

    const { data, dataTasks, loading, error, refresh, setPage } = useFetch(url);
    const tasksData = selectedDate === null ? dataTasks : filterTasksByDate(dataTasks, filterType, selectedDate);

    const onChangeDate = (date, dateString) => {
        setFilterType('specific');
        setSelectedDate(date);
    };
    const handlePagination = (page) => {
        setPage(page);
    };
    return (
        <div className="h-full flex flex-col ">
            <HeadingPage
                title="Quan trọng"
                onChangeDate={onChangeDate}
                setFilterType={setFilterType}
                setSelectedDate={setSelectedDate}
            />

            <div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center md:h-[calc(100vh-245px)] h-[calc(100vh-295px)] opacity-90">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div>
                        <ListCard
                            dataTask={tasksData}
                            refreshData={() => refresh()}
                            imgNoTask={imgNoTask}
                            titleNoTask="Mỗi một công việc đều quan trọng."
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

export default Important;
