import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { MoonFilled, SunFilled } from '@ant-design/icons';

import Button from '../Button';

const HeadingPage = ({ title, onChangeDate, setFilterType, setSelectedDate }) => {
    const currentDate = dayjs();
    const [realTimeClock, setRealTimeClock] = useState(dayjs().format('HH:mm:ss'));
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setRealTimeClock(dayjs().format('HH:mm:ss'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const currentHour = dayjs().hour();
    const getGreeting = () => {
        if (currentHour >= 0 && currentHour < 11) {
            return 'Chào buổi sáng!';
        } else if (currentHour >= 11 && currentHour < 13) {
            return 'Chào buổi trưa!';
        } else if (currentHour >= 13 && currentHour < 18) {
            return 'Chào buổi chiều!';
        } else {
            return 'Chào buổi tối!';
        }
    };
    const titleHello = getGreeting();
    const handleTasksByDay = (filterType) => {
        setActiveButton(filterType);
        setSelectedDate(filterType === null ? null : currentDate);
        setFilterType(filterType);
    };
    return (
        <div className="px-5 flex-col xl:flex-row flex xl:items-end gap-4">
            <h1 className="font-bold text-[1.5rem] pb-2 border-b-2 border-primaryColor w-max dark:text-textHeaddingDark">
                {title}
            </h1>
            <div className="flex justify-between flex-col lg:flex-row flex-1 gap-4 lg:items-end">
                <div className="flex justify-between gap-4">
                    <h2 className="text-textColor text-[1.6rem] leading-8 dark:text-textDark">{realTimeClock}</h2>
                    <div className="flex items-center gap-2 leading-[1rem]">
                        {currentHour <= 17 ? (
                            <SunFilled className="text-[1.4rem] text-yellow-400 " />
                        ) : (
                            <MoonFilled className="text-[1.4rem] text-yellow-200 " />
                        )}
                        <span className="text-[1rem]">{titleHello}</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
                    <div className="flex gap-3 ">
                        <Button
                            onClick={() => handleTasksByDay(null)}
                            outline
                            roundedBorder
                            small
                            className={`text-textColor  dark:hover:bg-separatorDark  ${
                                activeButton === null ? 'bg-separator dark:bg-defaultBorderDark' : 'hover:bg-separator'
                            }`}
                        >
                            Toàn bộ
                        </Button>
                        <Button
                            onClick={() => handleTasksByDay('last3days')}
                            outline
                            roundedBorder
                            small
                            className={`text-textColor  dark:hover:bg-separatorDark ${
                                activeButton === 'last3days'
                                    ? 'bg-separator dark:bg-defaultBorderDark'
                                    : 'hover:bg-separator'
                            }`}
                        >
                            3 ngày qua
                        </Button>
                        <Button
                            onClick={() => handleTasksByDay('last1days')}
                            outline
                            roundedBorder
                            small
                            className={`text-textColor  dark:hover:bg-separatorDark ${
                                activeButton === 'last1days'
                                    ? 'bg-separator dark:bg-defaultBorderDark'
                                    : 'hover:bg-separator'
                            }`}
                        >
                            Hôm qua
                        </Button>
                    </div>
                    <DatePicker
                        defaultValue={currentDate}
                        placeholder="Chọn ngày"
                        size="large"
                        onChange={onChangeDate}
                        format={{
                            format: 'DD/MM/YYYY',
                            type: 'mask',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

HeadingPage.propTypes = {
    title: PropTypes.string.isRequired,
    onChangeDate: PropTypes.func,
    setFilterType: PropTypes.func,
    setSelectedDate: PropTypes.func,
};

export default HeadingPage;
