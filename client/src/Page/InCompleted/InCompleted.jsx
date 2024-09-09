import { useState } from 'react';
import { Spin } from 'antd';

import { HeadingPage, ListCard } from '../../Component';
import useFetch from '../../Hook/useFetch.js';
import { BASE_URL } from '../../config.js';
import filterTasksByDate from '../../Utils/filterTasksByDate.js';

import imgNoTask from '../../assets/image/tasks-rafiki.png';
const InCompleted = () => {
    const url = `${BASE_URL}/task/incompletes`;
    const { data, loading, error, refresh } = useFetch(url);

    const [selectedDate, setSelectedDate] = useState(null);
    const [filterType, setFilterType] = useState(null);

    const onChangeDate = (date, dateString) => {
        setFilterType('specific');
        setSelectedDate(date);
    };
    const tasksData = selectedDate === null ? data : filterTasksByDate(data, filterType, selectedDate);
    return (
        <div>
            <HeadingPage
                title="Chưa hoàn thành"
                onChangeDate={onChangeDate}
                setFilterType={setFilterType}
                setSelectedDate={setSelectedDate}
            />
            <div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] opacity-90">
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
        </div>
    );
};

export default InCompleted;
