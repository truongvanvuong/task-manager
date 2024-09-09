import { useState } from 'react';
import { Spin } from 'antd';

import useFetch from '../../Hook/useFetch.js';
import { BASE_URL } from '../../config.js';
import { ListCard, HeadingPage } from '../../Component';
import filterTasksByDate from '../../Utils/filterTasksByDate.js';

import imgNoTask from '../../assets/image/Questions-pana.png';

const AllTask = () => {
    const url = `${BASE_URL}/task/`;

    const [selectedDate, setSelectedDate] = useState(null);
    const [filterType, setFilterType] = useState(null);

    const { data, loading, error, refresh } = useFetch(url);

    const onChangeDate = (date, dateString) => {
        setFilterType('specific');
        setSelectedDate(date);
    };
    const tasksData = selectedDate === null ? data : filterTasksByDate(data, filterType, selectedDate);
    return (
        <div>
            <HeadingPage
                title="Toàn bộ công việc"
                onChangeDate={onChangeDate}
                setFilterType={setFilterType}
                setSelectedDate={setSelectedDate}
            />
            <div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center opacity-90 h-[calc(100vh-160px)]">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div>
                        <ListCard
                            dataTask={tasksData}
                            refreshData={() => refresh()}
                            imgNoTask={imgNoTask}
                            titleNoTask="Bạn chưa có công việc nào rồi!"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTask;
