import { useState } from 'react';
import { Spin } from 'antd';

import { HeadingPage, ListCard } from '../../Component';
import useFetch from '../../Hook/useFetch.js';
import { BASE_URL } from '../../config.js';
import filterTasksByDate from '../../Utils/filterTasksByDate.js';

import imgNoTask from '../../assets/image/analysis-pana.png';
const Important = () => {
    const url = `${BASE_URL}/task/importants`;

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
                title="Quan trọng"
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
                            titleNoTask="Mỗi một công việc đều quan trọng."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Important;
